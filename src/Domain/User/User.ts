import { UserId } from './UserId';
import { UserName } from './UserName';

export class User {
  private readonly _id: UserId;
  private _name: UserName;

  constructor(name: UserName, id: UserId) {
    if (name === null) {
      throw new Error('Name is null.');
    }

    if (id === null) {
      throw new Error('Id is null.');
    }

    this._name = name;
    this._id = id;
  }

  get id(): UserId {
    return this._id;
  }

  get name(): UserName {
    return this._name;
  }

  changeName(name: UserName): void {
    this._name = name;
  }

  equals(other: User): boolean {
    return this._id === other._id;
  }
}
