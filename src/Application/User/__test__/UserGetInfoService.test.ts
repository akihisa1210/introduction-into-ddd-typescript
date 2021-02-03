import { container } from 'tsyringe';
import { IUserRepository } from 'Domain/User/IUserRepository';
import { User } from 'Domain/User/User';
import {
  UserGetInfoAll,
  UserGetInfoByUserId,
  UserGetInfoByUserName,
  UserGetInfoService,
} from '../UserGetInfoService';
import { UserId } from 'Domain/User/UserId';
import { UserName } from 'Domain/User/UserName';
import { IUserFactory } from 'Domain/User/IUserFactory';

beforeEach(() => {
  container.clearInstances();
});

describe('UserGetInfoService', () => {
  it('handle returns empty object if no user is registered', async () => {
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );

    const userGetInfoService = new UserGetInfoService(userRepository);

    const userGetInfoAll: UserGetInfoAll = { target: 'all', value: '' };

    const user = await userGetInfoService.handle(userGetInfoAll);

    expect(user).toEqual([]);
  });

  it('handle returns all users if users are registered', async () => {
    const userFactory: IUserFactory = container.resolve('IUserFactory');
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );

    await userRepository.save(userFactory.create(new UserName('user1')));
    await userRepository.save(userFactory.create(new UserName('user2')));

    const userGetInfoService = new UserGetInfoService(userRepository);

    const userGetInfoAll: UserGetInfoAll = { target: 'all', value: '' };

    const users = await userGetInfoService.handle(userGetInfoAll);

    expect(users.length).toEqual(2);
    expect(users[0].name).toEqual('user1');
    expect(users[1].name).toEqual('user2');
  });

  it('handle returns specified user if id is given', async () => {
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );

    await userRepository.save(
      new User(new UserName('user1'), new UserId('testId')),
    );

    const userGetInfoService = container.resolve(UserGetInfoService);

    const userGetInfoByUserId: UserGetInfoByUserId = {
      target: 'userId',
      value: 'testId',
    };

    const user = await userGetInfoService.handle(userGetInfoByUserId);

    expect(user.name).toEqual('user1');
  });

  it('handle returns specified user if name is given', async () => {
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );

    await userRepository.save(
      new User(new UserName('user1'), new UserId('testId')),
    );

    const userGetInfoService = container.resolve(UserGetInfoService);

    const userGetInfoByUserName: UserGetInfoByUserName = {
      target: 'userName',
      value: 'user1',
    };

    const user = await userGetInfoService.handle(userGetInfoByUserName);

    expect(user.name).toEqual('user1');
  });
});
