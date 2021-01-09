export class UserName {
  public readonly value: string;

  constructor(value: string) {
    if (value === null) {
      throw new Error('Value is null.');
    }
    if (value.length < 3) {
      throw new Error('Value must be longer than 3 characters.');
    }

    this.value = value;
  }

  public toString(): string {
    return this.value;
  }
}
