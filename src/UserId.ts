export class UserId {
  readonly value: string;

  constructor(value: string) {
    if (value === null) {
      throw new Error('Value is null.');
    }

    this.value = value;
  }
}
