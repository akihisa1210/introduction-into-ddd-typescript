import { UserId } from './UserId';
import { UserName } from './UserName';

export class User {
  readonly id: UserId;
  name: UserName;

  constructor(id: UserId, name: UserName) {
    if (id === null) {
      throw new Error('Id is null.');
    }

    if (name === null) {
      throw new Error('Name is null.');
    }

    this.id = id;
    this.name = name;
  }

  changeName(name: UserName): void {
    this.name = name;
  }

  equals(other: User): boolean {
    return this.id === other.id;
  }
}
