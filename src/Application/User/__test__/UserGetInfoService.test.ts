import { container } from 'tsyringe';
import { IUserRepository } from 'Repository/User/IUserRepository';
import { User } from 'Domain/User/User';
import { UserData } from '../UserData';
import { UserGetInfoService } from '../UserGetInfoService';
import { UserId } from 'Domain/User/UserId';
import { UserName } from 'Domain/User/UserName';
import { UserGetInfoCommand } from '../UserGetInfoCommand';

describe('UserGetInfoService', () => {
  it('handle returns empty object if no user is registered', async () => {
    const inMemoryUserRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );

    const userGetInfoService = new UserGetInfoService(inMemoryUserRepository);

    const user = await userGetInfoService.handle();

    expect(user).toEqual([]);
  });

  it('handle returns all users if users are registered', async () => {
    const inMemoryUserRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );

    await inMemoryUserRepository.save(new User(new UserName('user1')));
    await inMemoryUserRepository.save(new User(new UserName('user2')));

    const userGetInfoService = new UserGetInfoService(inMemoryUserRepository);

    const users = (await userGetInfoService.handle()) as UserData[];

    expect(users.length).toEqual(2);
    expect(users[0].name).toEqual('user1');
    expect(users[1].name).toEqual('user2');
  });

  it('handle returns specified user if id is given', async () => {
    const inMemoryUserRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );

    await inMemoryUserRepository.save(
      new User(new UserName('user1'), new UserId('testId')),
    );

    const userGetInfoService = new UserGetInfoService(inMemoryUserRepository);

    const userGetInfoCommand = new UserGetInfoCommand('testId');

    const user = (await userGetInfoService.handle(
      userGetInfoCommand,
    )) as UserData;

    expect(user.name).toEqual('user1');
  });
});
