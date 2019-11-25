import {IUserSmall} from './user-small.interface';

export interface IUserList {
  users: IUserSmall[];
  count: number;
  currentPage: number;
}
