import { container } from 'tsyringe';
import { IUserRepository } from 'Repository/User/IUserRepository';
import { User } from 'Domain/User/User';
import { UserData } from '../UserData';
import { UserRegisterService } from '../UserRegisterService';
import { UserId } from 'Domain/User/UserId';
import { UserName } from 'Domain/User/UserName';
import { UserRegisterCommand } from '../UserRegisterCommand';
import { UserService } from 'Domain/User/UserService';

describe('UserRegisterService', () => {
  it('handle creates a user', async () => {
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );
    const userService = new UserService(userRepository);

    const userRegisterService = new UserRegisterService(
      userRepository,
      userService,
    );

    await userRegisterService.handle(new UserRegisterCommand('user1'));

    const users = await userRepository.findAll();

    expect(users.length).toEqual(1);
    expect(users[0].name.value).toEqual('user1');
  });

  it('handle does not creates a user if the user already exists', async () => {
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );
    const userService = new UserService(userRepository);

    const userRegisterService = new UserRegisterService(
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
