import { UserApplicationService } from './UserApplicationService';
import { InMemoryUserRepository } from './InMemoryUserRepository';
import { UserService } from './UserService';
import { UserUpdateCommand } from './UserUpdateCommand';
import { UserDeleteCommand } from './UserDeleteCommand';

const inMemoryUserRepository = new InMemoryUserRepository();
const userService = new UserService(inMemoryUserRepository);
const userApplicationService = new UserApplicationService(
  inMemoryUserRepository,
  userService,
);

console.log('---userApplicationService.register---');
userApplicationService.register('test user');
console.log('---userApplicationService.get---');
userApplicationService.get('1');
console.log('---userApplicationService.update---');
const userUpdateCommand = new UserUpdateCommand('1', 'updated usre');
userApplicationService.update(userUpdateCommand);
console.log('---userApplicationService.delete---');
const userDeleteCommand = new UserDeleteCommand('1');
userApplicationService.delete(userDeleteCommand);
