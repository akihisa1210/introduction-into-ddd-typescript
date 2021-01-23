export class UserRegisterCommand {
  private _name;
  private _id;

  constructor(name: string, id?: string) {
    this._name = name;
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  get id(): string | undefined {
    return this._id;
  }
}
