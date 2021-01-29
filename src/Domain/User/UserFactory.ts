import { IUserFactory } from './IUserFactory';
import { User } from './User';
import { UserId } from './UserId';
import { UserName } from './UserName';
import { v4 as uuidv4 } from 'uuid';

export class UserFactory implements IUserFactory {
  create(userName: UserName): User {
    const userId = new UserId(uuidv4());

    return new User(userName, userId);
  }
}
