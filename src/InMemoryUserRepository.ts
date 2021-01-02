import { IUserRepository } from './IUserRepository';
import { User } from './User';
import { UserId } from './UserId';
import { UserName } from './UserName';

export class InMemoryUserRepository implements IUserRepository {
  public save(user: User): void {
    console.log(`Save ${user.name}`);
  }

  public findById(id: UserId): User | null {
    console.log(`finding user: ${id}`);
    return null;
  }

  public findByName(name: UserName): User | null {
    console.log(`finding user: ${name}`);
    return null;
  }

  public findAll(): User[] | null {
    console.log(`finding all users`);
    return null;
  }

  public delete(user: User): void {
    console.log(`Delete ${user.name}`);
  }
}
