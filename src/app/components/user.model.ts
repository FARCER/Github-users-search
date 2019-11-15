import {IUserData} from './user-data.interface';
import {IUserSmall} from './user-small.interface';
import {IUserRepos} from './user-repos.interface';

export class UserModel {

  constructor(public user: IUserData, public following: IUserSmall[], public followers: IUserSmall[], public repos: IUserRepos[]) {
  }


  public get avatarUrl(): string {
    return this.user.avatar_url;
  }

  public get name(): string {
    return this.user.name;
  }

  public get bio(): string {
    return this.user.bio;
  }

  public get htmlUrl(): string {
    return this.user.html_url;
  }

  public get login(): string {
    return this.user.login;
  }
}
