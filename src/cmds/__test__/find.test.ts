import { findUser } from 'cmds/find';
import { findAllUsers } from 'cmds/find';
import { container } from 'tsyringe';
import { IUserRepository } from 'Repository/User/IUserRepository';
import { UserName } from 'Domain/User/UserName';
import { IUserFactory } from 'Domain/User/IUserFactory';

beforeEach(() => {
  container.clearInstances();
});

describe('cmds/find', () => {
  it('findAllUser return empty array if user does not exist', async () => {
    const usersData = await findAllUsers();

    expect(usersData.length).toEqual(0);
  });

  it('findAllUser return all users', async () => {
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );
    const userFactory: IUserFactory = container.resolve('IUserFactory');

    const user1 = userFactory.create(new UserName('user1'));
    const user2 = userFactory.create(new UserName('user2'));

    await userRepository.save(user1);
    await userRepository.save(user2);

    const usersData = await findAllUsers();

    expect(usersData.length).toEqual(2);
    expect(usersData[0].name).toEqual('user1');
    expect(usersData[1].name).toEqual('user2');
  });

  it('findUser return a specified user', async () => {
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );
    const userFactory: IUserFactory = container.resolve('IUserFactory');

    const user1 = userFactory.create(new UserName('user1'));

    await userRepository.save(user1);

    const userData = await findUser('user1');

    expect(userData?.name).toEqual('user1');
  });
});
