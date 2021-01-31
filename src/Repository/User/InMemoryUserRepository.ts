import { IUserRepository } from './IUserRepository';
import { User } from '../../Domain/User/User';
import { UserId } from '../../Domain/User/UserId';
import { UserName } from '../../Domain/User/UserName';
import { singleton } from 'tsyringe';

@singleton()
export class InMemoryUserRepository implements IUserRepository {
  public users: User[];

  constructor() {
    console.log('Constructor of InMemoryUserRepository is called.');
    this.users = [];
  }

  public async save(user: User): Promise<void> {
    const existingUserIndex = this.users.findIndex(
      (existingUser) => existingUser.id === user.id,
    );

    // Register a new user
    if (existingUserIndex === -1) {
      this.users.push(user);
      return new Promise((resolve) => resolve());
    }

    // Update the existing user
    const existingUser = this.users[existingUserIndex];
    existingUser.changeName(user.name);
    this.users[existingUserIndex] = existingUser;
    return new Promise((resolve) => resolve());
  }

  public async findById(id: UserId): Promise<User | null> {
    const target = this.users.find((user) => user.id.value === id.value);
    if (target !== undefined) {
      return new Promise((resolve) => resolve(target));
    }
    return new Promise((resolve) => resolve(null));
  }

  public findByName(name: UserName): Promise<User | null> {
    const target = this.users.find((user) => user.name.value === name.value);
    if (target !== undefined) {
      return new Promise((resolve) => resolve(target));
    }
    return new Promise((resolve) => resolve(null));
  }

  public findAll(): Promise<User[]> {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }

  public delete(user: User): Promise<void> {
    const deleteTargetUser = this.users.find(
      (existingUser) => existingUser.id.value === user.id.value,
    );

    if (deleteTargetUser === undefined) {
      return new Promise((resolve) => resolve());
    }

    const newUsers = this.users.filter(
      (user) => user.id.value !== deleteTargetUser.id.value,
    );

    this.users = newUsers;

    return new Promise((resolve) => resolve());
  }
}
