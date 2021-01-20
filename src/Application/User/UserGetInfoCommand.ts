export class UserGetInfoCommand {
  private readonly _id;

  constructor(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }
}
