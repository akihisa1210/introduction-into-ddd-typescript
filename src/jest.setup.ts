import 'reflect-metadata';
import { container } from 'tsyringe';
import { UserService } from './Domain/User/UserService';
import { InMemoryUserRepository } from './Repository/User/InMemoryUserRepository';

export const setup = (): void => {
  container.register('IUserRepository', {
    useClass: InMemoryUserRepository,
  });
  container.register('UserService', { useClass: UserService });
};

setup();
