import { User } from './User';

export class UserData {
  private readonly _id;
  private readonly _name;

  constructor(source: User) {
    this._id = source.id.value;
    this._name = source.name.value;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}
