import 'reflect-metadata';
import { container } from 'tsyringe';
import { UserFactory } from 'Domain/User/UserFactory';
import { InMemoryUserRepository } from './InMemory/User/InMemoryUserRepository';
import { CircleFactory } from 'Domain/Circle/CircleFactory';
import { InMemoryCircleRepository } from 'InMemory/Circle/InMemoryCircleRepository';

export const setup = (): void => {
  // User
  container.register('IUserFactory', {
    useClass: UserFactory,
  });
  container.registerSingleton('IUserRepository', InMemoryUserRepository);

  // Circle
  container.register('ICircleFactory', {
    useClass: CircleFactory,
  });
  container.registerSingleton('ICircleRepository', InMemoryCircleRepository);
};

setup();
