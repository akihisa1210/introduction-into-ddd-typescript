import { container } from 'tsyringe';
import { IUserRepository } from 'Repository/User/IUserRepository';
import { User } from 'Domain/User/User';
import { UserDeleteCommand } from 'Application/User/UserDeleteCommand';
import { UserDeleteService } from '../UserDeleteService';
import { UserId } from 'Domain/User/UserId';
import { UserName } from 'Domain/User/UserName';

describe('UserDeleteService', () => {
  it('handle deletes a user', async () => {
    const inMemoryUserRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );

    await inMemoryUserRepository.save(
      new User(new UserName('user1'), new UserId('testId1')),
    );
    await inMemoryUserRepository.save(
      new User(new UserName('user2'), new UserId('testId2')),
    );

    const userDeleteService = new UserDeleteService(inMemoryUserRepository);

    const userDeleteCommand = new UserDeleteCommand('testId1');

    await userDeleteService.handle(userDeleteCommand);

    const users = await inMemoryUserRepository.findAll();

    expect(users.length).toEqual(1);
    expect(users[0].name.value).toEqual('user2');
  });
});