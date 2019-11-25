import {IUserModel} from '../interfaces/user-model.interface';
import {IUserData} from '../interfaces/user-data.interface';
import {IUserSmall} from '../interfaces/user-small.interface';
import {IUserRepos} from '../interfaces/user-repos.interface';

export class UserModel {
  public readonly user: IUserData;
  public readonly following: IUserSmall[];
  public readonly followers: IUserSmall[];
  public readonly repos: IUserRepos[];

  constructor(userModel: IUserModel) {
    this.user = userModel && userModel.user;
    this.following = userModel && userModel.following;
    this.followers = userModel && userModel.followers;
    this.repos = userModel && userModel.repos;
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
