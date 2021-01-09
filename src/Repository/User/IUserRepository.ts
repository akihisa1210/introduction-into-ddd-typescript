import { User } from '../../User';
import { UserId } from '../../UserId';
import { UserName } from '../../UserName';

export type IUserRepository = {
  save(user: User): void;

  findById(id: UserId): Promise<User | null>;
  findByName(name: UserName): Promise<User | null>;

  findAll(): User[] | null;

  delete(user: User): void;
};
