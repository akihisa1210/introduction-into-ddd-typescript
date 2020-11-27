export class FullName {
  private readonly _firstName: string;
  private readonly _lastName: string;

  constructor(firstName: string, lastName: string) {
    if (!this.validateName(firstName)) {
      throw new Error('許可されていない文字が使われています');
    }
    if (!this.validateName(lastName)) {
      throw new Error('許可されていない文字が使われています');
    }
    this._firstName = firstName;
    this._lastName = lastName;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  equals(other: FullName): boolean {
    return (
      this._firstName === other._firstName && this._lastName === other._lastName
    );
  }

  validateName(name: string): boolean {
    return /^[a-zA-Z]+$/.test(name);
  }
}
