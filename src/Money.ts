export class Money {
  readonly amount: number;
  readonly currency: string;

  constructor(amount: number, currency: string) {
    if (currency === null) {
      throw new Error('Currency is null');
    }
    this.amount = amount;
    this.currency = currency;
  }

  add(arg: Money): Money {
    if (arg === null) {
      throw new Error('Arg is null');
    }
    if (this.currency !== arg.currency) {
      throw new Error('通貨単位が異なります。');
    }

    // 値オブジェクトは不変なので、計算後は新しいインスタンスを返す。
    return new Money(this.amount + arg.amount, this.currency);
  }
}
