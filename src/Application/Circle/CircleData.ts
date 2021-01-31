import { Circle } from 'Domain/Circle/Circle';

export class CircleData {
  private readonly _id;
  private readonly _name;

  constructor(source: Circle) {
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
