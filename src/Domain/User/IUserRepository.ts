import { User } from './User';
import { UserId } from './UserId';
import { UserName } from './UserName';

export type IUserRepository = {
  save(user: User): Promise<void>;

  findById(id: UserId): Promise<User | null>;
  findByName(name: UserName): Promise<User | null>;

  findAll(): Promise<User[]>;

  delete(user: User): Promise<void>;
};
