import { FullName } from './name';
import { Money } from './Money';
import { User } from './User';
import { UserName } from './UserName';
import { createUser } from './createUser';
import { UserService } from './UserService';

const fullname = new FullName('john', 'smith');
console.log(fullname.lastName);

console.log('equality');
const a = new FullName('john', 'smith');
const b = new FullName('john', 'manjiro');

console.log(fullname.equals(a));
console.log(fullname.equals(b));
console.log(fullname.equals(fullname));

// const invalidName = new FullName('john ', 'smith');

const myMoney = new Money(1000, 'JPY');
const allowance = new Money(3000, 'JPY');
const result = myMoney.add(allowance);
console.log(result);

const usd = new Money(10, 'USD');
// const result2 = myMoney.add(usd);

const userName = new UserName('test name');
const user = new User(userName);
// user.userId = 'hoge';
// Error!
// Type 'string' is not assignable to type 'UserId'.
console.log(user);

console.log(createUser('Joe!'));

// Domain Service
const userService = new UserService();
const duplicateCheckResult = userService.exists(user);
console.log(duplicateCheckResult);
