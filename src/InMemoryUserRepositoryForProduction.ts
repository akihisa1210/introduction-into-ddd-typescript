import { IUserRepository } from './IUserRepository';
import { User } from './User';
import { UserId } from './UserId';
import { UserName } from './UserName';
import { injectable } from 'tsyringe';

@injectable()
export class InMemoryUserRepositoryForProduction implements IUserRepository {
  public save(user: User): void {
    console.log(`Save ${user.name} for production!`);
  }

  public findById(id: UserId): User | null {
    console.log(`finding user: ${id} for production!`);
    return null;
  }

  public findByName(name: UserName): User | null {
    console.log(`finding user: ${name} for production!`);
    return null;
  }

  public findAll(): User[] | null {
    console.log(`finding all users for production!`);
    return null;
  }

  public delete(user: User): void {
    console.log(`Delete ${user.name} for production!`);
  }
}
