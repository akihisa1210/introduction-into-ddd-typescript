import 'reflect-metadata';
import { container } from 'tsyringe';
import { UserRepository } from './Repository/User/UserRepository';
import { UserService } from './Domain/User/UserService';
import { UserFactory } from 'Domain/User/UserFactory';
// import { InMemoryUserRepository } from './Repository/User/InMemoryUserRepository';

export const setup = (): void => {
  container.register('IUserFactory', {
    useClass: UserFactory,
  });
  container.register('IUserRepository', {
    useClass: UserRepository,
  });
  // container.register('IUserRepository', {
  //   useClass: InMemoryUserRepository,
  // });
  container.register('UserService', { useClass: UserService });
};
