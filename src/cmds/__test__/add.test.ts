import { addUser } from 'cmds/add';
import { container } from 'tsyringe';
import { IUserRepository } from 'Repository/User/IUserRepository';
import { UserName } from 'Domain/User/UserName';

beforeEach(() => {
  container.clearInstances();
});

describe('cmds/add', () => {
  it('addUser adds a user', async () => {
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );
    const userData = await addUser('user1');

    const user = await userRepository.findByName(new UserName('user1'));

    expect(userData.name).toEqual('user1');
    expect(user?.name.value).toEqual('user1');
  });
});
