import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IUserList} from '../../interfaces/user-list.interface';
import {HttpClient} from '@angular/common/http';
import {catchError, debounceTime, distinctUntilChanged, shareReplay, switchMap} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {IUserData} from '../../interfaces/user-data.interface';
import {IUserSmall} from '../../interfaces/user-small.interface';
import {IUserRepos} from '../../interfaces/user-repos.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {

  private MAX_USER_PER_PAGE: number = 10;
  private DEBOUNCE_TIME: number = 300;

  public searchControl: FormControl = new FormControl();
  public model: IUserList = {
    users: [],
    count: 0,
    currentPage: 1,
  };
  private searchString: string;

  @Output() userLogin = new EventEmitter<UserModel>();

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(this.DEBOUNCE_TIME),
      distinctUntilChanged(),
      shareReplay(),
      switchMap((searchString: string) => {
        this.searchString = searchString.trim();
        return this.searchString ?
          this.http.get(`https://api.github.com/search/users?q=${this.searchString}&per_page=${this.MAX_USER_PER_PAGE}`) : of([]);
      }),
      catchError(() => throwError('Alarm'))
    ).subscribe((res: any) => {
      this.model.count = res.total_count;
      this.model.users = (res.items && res.items.length) ? res.items : [];
      this.changeDetectorRef.detectChanges();
    });
  }

  public loadMore(): void {
    this.model.currentPage++;
    this.http.get(`https://api.github.com/search/users?q=${this.searchString}&per_page=${this.MAX_USER_PER_PAGE}&page=${this.model.currentPage}`)
      .subscribe((res: any) => {
        this.model.users.push(...res.items);
        this.changeDetectorRef.detectChanges();
      });
  }

  public showMoreBtn(): boolean {
    return this.model.count > 10 && this.model.users.length !== this.model.count;
  }

  public selectedUser(login: string): void {
    let user: UserModel;
    this.userService.getUser(login).subscribe(
      ([userData, following, followers, repos]: [IUserData, IUserSmall[], IUserSmall[], IUserRepos[]]) => {
        user = new UserModel(
          {
            user: userData,
            following,
            followers,
            repos
          });
        this.userLogin.emit(user);
      });
  }
}
