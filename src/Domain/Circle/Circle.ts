import { UserId } from 'Domain/User/UserId';

export class CircleName {
  private _name: string;

  constructor(name: string) {
    if (name === null) {
      throw new Error('Name is null.');
    }
    this._name = name;
  }
}

export class Circle {
  private _circleName: CircleName;
  private _ownerId: UserId;

  constructor(circleName: CircleName, ownerId: UserId) {
    if (circleName === null) {
      throw new Error('CircleName is null.');
    }

    if (ownerId === null) {
      throw new Error('OwnerId is null.');
    }

    this._circleName = circleName;
    this._ownerId = ownerId;
  }
}
