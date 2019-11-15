import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IUserList} from '../user-list.interface';
import {HttpClient} from '@angular/common/http';
import {catchError, debounceTime, distinctUntilChanged, shareReplay, switchMap} from 'rxjs/operators';
import {of, throwError} from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  public searchControl: FormControl = new FormControl();
  public model: IUserList = {
    users: [],
    count: 0,
    currentPage: 1,
  };
  private searchString: string;


  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      shareReplay(1),
      switchMap((searchString: string) => {
        this.searchString = searchString.trim();
        return this.searchString ?
          this.http.get(`https://api.github.com/search/users?q=${this.searchString}&per_page=10`) : of([]);
      }),
      catchError((error) => throwError('Alarm'))
    ).subscribe((res: any) => {
      this.model.count = res.total_count;
      this.model.users = (res.items && res.items.length) ? res.items : [];
      this.changeDetectorRef.detectChanges();
    });
  }

  public loadMore() {
    this.model.currentPage++;
    this.http.get(`https://api.github.com/search/users?q=${this.searchString}&per_page=10&page=${this.model.currentPage}`)
      .subscribe((res: any) => {
        this.model.users.push(...res.items);
        this.model.users = this.model.users.slice();
        this.changeDetectorRef.detectChanges();
      });
  }

  public showMoreBtn() {
    return this.model.count > 10 && this.model.users.length !== this.model.count;
  }
}
