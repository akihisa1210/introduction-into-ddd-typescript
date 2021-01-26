import { User } from './User';
import { UserName } from './UserName';

export type IUserFactory = {
  create(userName: UserName): User;
};
