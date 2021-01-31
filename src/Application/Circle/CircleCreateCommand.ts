export class CircleCreateCommand {
  private readonly _name: string;
  private readonly _userId: string;

  constructor(name: string, userId: string) {
    this._name = name;
    this._userId = userId;
  }

  get name(): string {
    return this._name;
  }

  get userId(): string {
    return this._userId;
  }
}
