import { User } from './User';
import { UserId } from './UserId';
import { UserName } from './UserName';

export type IUserRepository = {
  save(user: User): void;

  findById(id: UserId): User | null;
  findByName(name: UserName): User | null;

  findAll(): User[] | null;

  delete(user: User): void;
};
