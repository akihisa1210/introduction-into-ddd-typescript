import { User } from 'Domain/User/User';
import { UserName } from 'Domain/User/UserName';
import { UserService } from 'Domain/User/UserService';
import { IUserRepository } from 'Repository/User/IUserRepository';
import { container } from 'tsyringe';

describe('UserService', () => {
  it('exists returns false when user does not exist', async () => {
    const inMemoryUserRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );

    const userService = new UserService(inMemoryUserRepository);
    const found = await userService.exists(new User(new UserName('test')));

    expect(found).toEqual(false);
  });

  it('exists returns true when user exists', async () => {
    const inMemoryUserRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );

    const user = new User(new UserName('test'));

    await inMemoryUserRepository.save(user);

    const userService = new UserService(inMemoryUserRepository);
    const found = await userService.exists(new User(new UserName('test')));

    expect(found).toEqual(true);
  });
});