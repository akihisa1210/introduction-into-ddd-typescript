import 'reflect-metadata';
import { container } from 'tsyringe';
import { UserRepository } from './MongoDB/User/UserRepository';
import { UserFactory } from 'Domain/User/UserFactory';
// import { InMemoryUserRepository } from './Repository/User/InMemoryUserRepository';

export const setup = (): void => {
  // User
  container.register('IUserFactory', {
    useClass: UserFactory,
  });
  container.register('IUserRepository', {
    useClass: UserRepository,
    // useClass: InMemoryUserRepository,
  });
};
