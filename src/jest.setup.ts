import 'reflect-metadata';
import { container } from 'tsyringe';
import { UserFactory } from 'Domain/User/UserFactory';
import { UserService } from './Domain/User/UserService';
import { InMemoryUserRepository } from './Repository/User/InMemoryUserRepository';
import { CircleFactory } from 'Domain/Circle/CircleFactory';

export const setup = (): void => {
  // User
  container.register('IUserFactory', {
    useClass: UserFactory,
  });
  container.register('IUserRepository', {
    useClass: InMemoryUserRepository,
  });
  container.register('UserService', { useClass: UserService });

  // Circle
  container.register('ICircleFactory', {
    useClass: CircleFactory,
  });
};

setup();
