import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {IUserRepos} from '../interfaces/user-repos.interface';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getUser(login: string): Observable<any> {
    return forkJoin([
      this.getData(`https://api.github.com/users/${login}`),
      this.getData(`https://api.github.com/users/${login}/following`),
      this.getData(`https://api.github.com/users/${login}/followers`),
      this.getData(`https://api.github.com/users/${login}/repos`),
    ]);
  }

  private getData(url: string): Observable<any> {
    return this.http.get<IUserRepos[]>(url).pipe(
      catchError(() => of(null))
    );
  }
}
