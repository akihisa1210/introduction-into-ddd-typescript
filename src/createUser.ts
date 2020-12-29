import { UserName } from './UserName';
import { User } from './User';

export const createUser = (name: string): void => {
  const userName = new UserName(name);
  const user = new User(userName);
  console.log(user);
};
