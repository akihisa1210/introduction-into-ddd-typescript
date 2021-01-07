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
    console.log(`finding user by id: ${id.value} for production!`);
    if (id.value === '2') {
      console.log('User found!');
      return new User(new UserName('ExistingUser2'));
    }
    console.log('User not found!');
    return null;
  }

  public findByName(name: UserName): User | null {
    console.log(`finding user: ${name} for production!`);
    if (name.value === 'NewUser') {
      return null;
    }
    if (name.value === 'NewName') {
      return null;
    }
    return new User(name);
  }

  public findAll(): User[] | null {
    console.log(`finding all users for production!`);
    return [new User(new UserName('User1')), new User(new UserName('User2'))];
  }

  public delete(user: User): void {
    console.log(`Delete ${user.name} for production!`);
  }
}
