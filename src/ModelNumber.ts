export class ModelNumber {
  readonly productCode: string;
  readonly branch: string;
  readonly lot: string;

  constructor(productCode: string, branch: string, lot) {
    if (productCode === null) {
      throw new Error('Product code is null.');
    }
    if (branch === null) {
      throw new Error('Branch is null.');
    }
    if (lot === null) {
      throw new Error('Lot is null.');
    }

    this.productCode = productCode;
    this.branch = branch;
    this.lot = lot;
  }

  toString(): string {
    return `${this.productCode}-${this.branch}-${this.lot}`;
  }
}
