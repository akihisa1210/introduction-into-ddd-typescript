import { UserApplicationService } from './UserApplicationService';
import { InMemoryUserRepository } from './InMemoryUserRepository';
import { UserService } from './UserService';

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
userApplicationService.update('1', 'updated user');
