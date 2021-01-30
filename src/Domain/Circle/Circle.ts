import { User } from 'Domain/User/User';

export class CircleId {
  private _value: string;

  constructor(value: string) {
    if (value === null) {
      throw new Error('CircleId is null');
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}

export class CircleName {
  private _value: string;

  constructor(value: string) {
    if (value === null) {
      throw new Error('Name is null.');
    }
    if (value.length < 3) {
      throw new Error('CircleName must be more than 3 characters');
    }
    if (value.length > 20) {
      throw new Error('CircleName must be less than 20 characters');
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  equals(other: CircleName): boolean {
    return this._value === other._value;
  }
}

export class Circle {
  private _id: CircleId;
  private _name: CircleName;
  private _owner: User;
  private _members: User[];

  constructor(id: CircleId, name: CircleName, owner: User, members: User[]) {
    if (id === null) {
      throw new Error('CircleId is null.');
    }
    if (name === null) {
      throw new Error('CircleName is null.');
    }
    if (owner === null) {
      throw new Error('Owner is null.');
    }
    if (members === null) {
      throw new Error('Members is null.');
    }

    this._id = id;
    this._name = name;
    this._owner = owner;
    this._members = members;
  }

  get id(): CircleId {
    return this._id;
  }

  get name(): CircleName {
    return this._name;
  }

  set name(name: CircleName) {
    this._name = name;
  }

  get owner(): User {
    return this._owner;
  }

  set owner(owner: User) {
    this._owner = owner;
  }

  get members(): User[] {
    return this._members;
  }

  set members(members: User[]) {
    this._members = members;
  }
}
