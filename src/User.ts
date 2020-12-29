import { UserId } from './UserId';
import { UserName } from './UserName';
import { v4 as uuidv4 } from 'uuid';

export class User {
  private readonly _id: UserId;
  private _name: UserName;

  constructor(name: UserName) {
    if (name === null) {
      throw new Error('Name is null.');
    }

    this._id = new UserId(uuidv4());
    this._name = name;
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
