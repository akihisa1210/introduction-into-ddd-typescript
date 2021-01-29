import { container } from 'tsyringe';
import { IUserRepository } from 'Repository/User/IUserRepository';
import { UserRegisterService } from '../UserRegisterService';
import { UserRegisterCommand } from '../UserRegisterCommand';
import { UserService } from 'Domain/User/UserService';
import { IUserFactory } from 'Domain/User/IUserFactory';

describe('UserRegisterService', () => {
  it('handle creates a user', async () => {
    const userFactory: IUserFactory = container.resolve('IUserFactory');
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );
    const userService = new UserService(userRepository);

    const userRegisterService = new UserRegisterService(
      userFactory,
      userRepository,
      userService,
    );

    await userRegisterService.handle(new UserRegisterCommand('user1'));

    const users = await userRepository.findAll();

    expect(users.length).toEqual(1);
    expect(users[0].name.value).toEqual('user1');
  });

  it('handle does not creates a user if the user already exists', async () => {
    const userFactory: IUserFactory = container.resolve('IUserFactory');
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );
    const userService = new UserService(userRepository);

    const userRegisterService = new UserRegisterService(
      userFactory,
      userRepository,
      userService,
    );

    await userRegisterService.handle(new UserRegisterCommand('user1'));

    await expect(
      userRegisterService.handle(new UserRegisterCommand('user1')),
    ).rejects.toThrow('User already exists');

    const users = await userRepository.findAll();

    expect(users.length).toEqual(1);
    expect(users[0].name.value).toEqual('user1');
  });
});
