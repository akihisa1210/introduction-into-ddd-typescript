import { IUserRepository } from './IUserRepository';
import { User } from '../../Domain/User/User';
import { UserId } from '../../Domain/User/UserId';
import { UserName } from '../../Domain/User/UserName';
import { injectable } from 'tsyringe';

@injectable()
export class InMemoryUserRepository implements IUserRepository {
  public save(user: User): void {
    console.log(`Save ${user.name} for production!`);
  }

  public async findById(id: UserId): Promise<User | null> {
    console.log(`finding user by id: ${id.value} for production!`);
    if (id.value === '2') {
      console.log('User found!');
      return new Promise((resolve) => {
        resolve(new User(new UserName('ExistingUser2')));
      });
    }
    console.log('User not found!');
    return new Promise((resolve) => {
      resolve(null);
    });
  }

  public findByName(name: UserName): Promise<User | null> {
    console.log(`finding user: ${name} for production!`);
    if (name.value === 'NewUser') {
      return new Promise((resolve) => {
        resolve(null);
      });
    }
    if (name.value === 'NewName') {
      return new Promise((resolve) => {
        resolve(null);
      });
    }
    return new Promise((resolve) => {
      resolve(new User(new UserName(name.value)));
    });
  }

  public findAll(): Promise<User[]> {
    console.log(`finding all users for production!`);
    return new Promise((resolve) => {
      resolve([
        new User(new UserName('User1')),
        new User(new UserName('User2')),
      ]);
    });
  }

  public delete(user: User): void {
    console.log(`Delete ${user.name} for production!`);
  }
}
