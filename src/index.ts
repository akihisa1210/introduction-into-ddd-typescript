import 'reflect-metadata';
import { container } from 'tsyringe';

import { InMemoryUserRepository } from './InMemoryUserRepository';
import { UserService } from './UserService';
import { UserUpdateCommand } from './UserUpdateCommand';
import { UserDeleteCommand } from './UserDeleteCommand';
import { UserRegisterCommand } from './UserRegisterCommand';
import { UserRegisterService } from './Application/User/UserRegisterService';
import { UserGetInfoService } from './Application/User/UserGetInfoService';
import { UserUpdateService } from './Application/User/UserUpdateService';
import { UserDeleteService } from './Application/User/UserDeleteService';
import { InMemoryUserRepositoryForProduction } from './InMemoryUserRepositoryForProduction';

// container.register('IUserRepository', {
//   useClass: InMemoryUserRepository,
// });
container.register('IUserRepository', {
  useClass: InMemoryUserRepositoryForProduction,
});
container.register('UserService', { useClass: UserService });

console.log('---UserRegisterService---');
const userRegisterService: UserRegisterService = container.resolve(
  UserRegisterService,
);
const userRegistercommand = new UserRegisterCommand('new user');
userRegisterService.handle(userRegistercommand);

// console.log('---UserGetInfoService---');
// const userGetInfoService = new UserGetInfoService(inMemoryUserRepository);
// userGetInfoService.handle('1');

// console.log('---UserUpdateService---');
// const userUpdateService = new UserUpdateService(
//   inMemoryUserRepository,
//   userService,
// );
// const userUpdateCommand = new UserUpdateCommand('1', 'updated usre');
// userUpdateService.handle(userUpdateCommand);

// console.log('---UserDeleteService---');
// const userDeleteService = new UserDeleteService(inMemoryUserRepository);
// const userDeleteCommand = new UserDeleteCommand('1');
// userDeleteService.handle(userDeleteCommand);
