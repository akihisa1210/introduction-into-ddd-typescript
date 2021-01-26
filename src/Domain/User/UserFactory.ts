import { IUserFactory } from './IUserFactory';
import { User } from './User';
import { UserName } from './UserName';

export class UserFactory implements IUserFactory {
  create(userName: UserName): User {
    return new User(userName);
  }
}
