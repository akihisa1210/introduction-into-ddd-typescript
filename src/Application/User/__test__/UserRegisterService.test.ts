import { container } from 'tsyringe';
import { IUserRepository } from 'Domain/User/IUserRepository';
import { UserRegisterService } from '../UserRegisterService';
import { UserRegisterCommand } from '../UserRegisterCommand';

beforeEach(() => {
  container.clearInstances();
});

describe('UserRegisterService', () => {
  it('handle creates a user', async () => {
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );

    const userRegisterService = container.resolve(UserRegisterService);

    await userRegisterService.handle(new UserRegisterCommand('user1'));

    const users = await userRepository.findAll();

    expect(users.length).toEqual(1);
    expect(users[0].name.value).toEqual('user1');
  });

  it('handle does not creates a user if the user already exists', async () => {
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );

    const userRegisterService = container.resolve(UserRegisterService);

    await userRegisterService.handle(new UserRegisterCommand('user1'));

    await expect(
      userRegisterService.handle(new UserRegisterCommand('user1')),
    ).rejects.toThrow('User already exists');

    const users = await userRepository.findAll();

    expect(users.length).toEqual(1);
    expect(users[0].name.value).toEqual('user1');
  });
});
