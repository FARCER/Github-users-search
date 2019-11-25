import {IUserData} from './user-data.interface';
import {IUserSmall} from './user-small.interface';
import {IUserRepos} from './user-repos.interface';

export interface IUserModel {
  user: IUserData;
  following: IUserSmall[];
  followers: IUserSmall[];
  repos: IUserRepos[];
}
