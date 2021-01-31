import { deleteUser } from 'cmds/delete';
import { container } from 'tsyringe';
import { IUserRepository } from 'Repository/User/IUserRepository';
import { UserName } from 'Domain/User/UserName';
import { IUserFactory } from 'Domain/User/IUserFactory';

beforeEach(() => {
  container.clearInstances();
});

describe('cmds/delete', () => {
  it('deleteUser deletes a user by name', async () => {
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );
    const userFactory: IUserFactory = container.resolve('IUserFactory');

    await userRepository.save(userFactory.create(new UserName('user1')));

    await deleteUser('user1');

    const usersData = await userRepository.findAll();

    expect(usersData.length).toEqual(0);
  });
});
