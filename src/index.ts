import { FullName } from './name';

const fullname = new FullName('john', 'smith');
console.log(fullname.lastName);

console.log('equality');
const a = new FullName('john', 'smith');
const b = new FullName('john', 'manjiro');

console.log(fullname.equals(a));
console.log(fullname.equals(b));
console.log(fullname.equals(fullname));

const invalidName = new FullName('john ', 'smith');
