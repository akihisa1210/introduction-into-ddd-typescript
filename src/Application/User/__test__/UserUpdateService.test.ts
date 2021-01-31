import { container } from 'tsyringe';
import { IUserRepository } from 'Repository/User/IUserRepository';
import { UserUpdateService } from '../UserUpdateService';
import { UserUpdateCommand } from '../UserUpdateCommand';
import { User } from 'Domain/User/User';
import { UserName } from 'Domain/User/UserName';
import { UserId } from 'Domain/User/UserId';

beforeEach(() => {
  container.clearInstances();
});

describe('UserUpdateService', () => {
  it('handle updates a user name', async () => {
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );

    const userUpdateService = container.resolve(UserUpdateService);

    await userRepository.save(
      new User(new UserName('user1'), new UserId('user1id')),
    );

    await userUpdateService.handle(
      new UserUpdateCommand('user1id', 'updatedName'),
    );

    const users = await userRepository.findAll();

    expect(users.length).toEqual(1);
    expect(users[0].name.value).toEqual('updatedName');
  });

  it('handle returns error if the user name is already userd', async () => {
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );

    const userUpdateService = container.resolve(UserUpdateService);

    await userRepository.save(
      new User(new UserName('user1'), new UserId('user1id')),
    );

    await userRepository.save(
      new User(new UserName('user2'), new UserId('user2id')),
    );

    await expect(
      userUpdateService.handle(new UserUpdateCommand('user1id', 'user2')),
    ).rejects.toThrow('User already exists');

    const users = await userRepository.findAll();

    expect(users.length).toEqual(2);
    expect(users[0].name.value).toEqual('user1');
    expect(users[1].name.value).toEqual('user2');
  });
});
