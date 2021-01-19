import { IUserRepository } from 'Repository/User/IUserRepository';
import { UserGetInfoService } from '../UserGetInfoService';

import { container } from 'tsyringe';

describe('UserGetInfoService', () => {
  it('handle returns empty object if no user is registered', async () => {
    const inMemoryUserRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );

    const userGetInfoService = new UserGetInfoService(inMemoryUserRepository);

    const user = await userGetInfoService.handle();

    expect(user).toEqual([]);
  });
});
