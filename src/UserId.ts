export class UserId {
  private readonly value: string;

  constructor(value: string) {
    if (value === null) {
      throw new Error('Value is null.');
    }

    this.value = value;
  }
}
