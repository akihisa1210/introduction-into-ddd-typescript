import { User } from './User';
import { UserName } from './UserName';
import { UserService } from './UserService';

export const createUser = (name: string): void => {
  const user = new User(new UserName(name));
  const userService = new UserService();

  if (userService.exists(user)) {
    throw new Error('User already exists');
  }

  // DB にユーザーを登録
};
