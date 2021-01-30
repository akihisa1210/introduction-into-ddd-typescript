export class CircleJoinCommand {
  private readonly _circleId: string;
  private readonly _userId: string;

  constructor(circleId: string, userId: string) {
    this._circleId = circleId;
    this._userId = userId;
  }

  get circleId(): string {
    return this._circleId;
  }

  get userId(): string {
    return this._userId;
  }
}
