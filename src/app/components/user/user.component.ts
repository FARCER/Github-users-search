import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../user.model';
import {forkJoin, Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {IUserRepos} from '../user-repos.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {

  public user: UserModel;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const login = this.route.snapshot.paramMap.get('login');
    forkJoin([
      this.getData(`https://api.github.com/users/${login}`),
      this.getData(`https://api.github.com/users/${login}/following`),
      this.getData(`https://api.github.com/users/${login}/followers`),
      this.getData(`https://api.github.com/users/${login}/repos`),
    ]).subscribe(user => {
      if (user.every(i => i !== null)) {
        this.user = new UserModel(user[0], user[1], user[2], user[3]);
      }
      this.changeDetectorRef.detectChanges();
    });
  }

  private getData(url: string): Observable<any> {
    return this.http.get<IUserRepos[]>(url).pipe(
      catchError(() => of(null))
    );
  }

}
