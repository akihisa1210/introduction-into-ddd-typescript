import { updateUser } from 'cmds/update';
import { container } from 'tsyringe';
import { IUserRepository } from 'Domain/User/IUserRepository';
import { UserName } from 'Domain/User/UserName';
import { IUserFactory } from 'Domain/User/IUserFactory';

beforeEach(() => {
  container.clearInstances();
});

describe('cmds/update', () => {
  it('updateUser updates a user', async () => {
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );
    const userFactory: IUserFactory = container.resolve('IUserFactory');

    await userRepository.save(userFactory.create(new UserName('user1')));

    const userData = await updateUser('user1', 'updatedName');

    const user = await userRepository.findByName(new UserName('updatedName'));

    expect(userData.name).toEqual('updatedName');
    expect(user?.name.value).toEqual('updatedName');
  });
});
