import { User } from './User';
import { UserName } from './UserName';

export interface IUserRepository {
  save(user: User): void;
  find(name: UserName): User | null;
}
