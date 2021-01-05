import { InMemoryUserRepository } from './InMemoryUserRepository';
import { UserService } from './UserService';
import { UserUpdateCommand } from './UserUpdateCommand';
import { UserDeleteCommand } from './UserDeleteCommand';
import { UserRegisterCommand } from './UserRegisterCommand';
import { UserRegisterService } from './Application/User/UserRegisterService';
import { UserGetInfoService } from './Application/User/UserGetInfoService';
import { UserUpdateService } from './Application/User/UserUpdateService';
import { UserDeleteService } from './Application/User/UserDeleteService';

const inMemoryUserRepository = new InMemoryUserRepository();
const userService = new UserService(inMemoryUserRepository);

console.log('---UserRegisterService---');
const userRegistrationService = new UserRegisterService(
  inMemoryUserRepository,
  userService,
);
const userRegistercommand = new UserRegisterCommand('new user');
userRegistrationService.handle(userRegistercommand);

console.log('---UserGetInfoService---');
const userGetInfoService = new UserGetInfoService(inMemoryUserRepository);
userGetInfoService.handle('1');

console.log('---UserUpdateService---');
const userUpdateService = new UserUpdateService(
  inMemoryUserRepository,
  userService,
);
const userUpdateCommand = new UserUpdateCommand('1', 'updated usre');
userUpdateService.handle(userUpdateCommand);

console.log('---UserDeleteService---');
const userDeleteService = new UserDeleteService(inMemoryUserRepository);
const userDeleteCommand = new UserDeleteCommand('1');
userDeleteService.handle(userDeleteCommand);
