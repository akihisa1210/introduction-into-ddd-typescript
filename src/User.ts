import { UserId } from './UserId';
import { UserName } from './UserName';

export class User {
  userId: UserId;
  userName: UserName;

  constructor(userName: UserName) {
    this.userId = new UserId('dummy');
    this.userName = userName;
  }
}
