import { UserId } from './UserId';
import { UserName } from './UserName';

export class User {
  id: UserId;
  name: UserName;

  constructor(name: UserName) {
    this.id = new UserId('dummy');
    this.name = name;
  }

  changeName(name: UserName): void {
    this.name = name;
  }
}
