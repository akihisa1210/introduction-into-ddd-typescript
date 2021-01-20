import { User } from '../../Domain/User/User';
import { UserId } from '../../Domain/User/UserId';
import { UserName } from '../../Domain/User/UserName';

export type IUserRepository = {
  save(user: User): Promise<void>;

  findById(id: UserId): Promise<User | null>;
  findByName(name: UserName): Promise<User | null>;

  findAll(): Promise<User[]>;

  delete(user: User): Promise<void>;
};
