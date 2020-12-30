export class UserName {
  private readonly value: string;

  constructor(value: string) {
    if (value === null) {
      throw new Error('Value is null.');
    }
    if (value.length < 3) {
      throw new Error('Value must be longer than 3 characters.');
    }

    this.value = value;
  }

  get name(): string {
    return this.value;
  }
}
