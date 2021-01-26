import { UserName } from 'Domain/User/UserName';
import { UserFactory } from '../UserFactory';

describe('UserFactory', () => {
  it('creates a user', () => {
    const userName = new UserName('user1');
    const userFactory = new UserFactory();
    const user = userFactory.create(userName);

    expect(user.name.value).toEqual('user1');
  });
});
