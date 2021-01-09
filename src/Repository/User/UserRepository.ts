import { IUserRepository } from './IUserRepository';
import { User } from '../../User';
import { UserId } from '../../UserId';
import { UserName } from '../../UserName';
import { injectable } from 'tsyringe';

import { MongoClient, Collection, ObjectId } from 'mongodb';
// import { collections, connect } from '../../db';

const MONGODDB_URI =
  'mongodb://root:example@mongo:27017/example?authSource=admin';

@injectable()
export class UserRepository implements IUserRepository {
  public async save(user: User): Promise<void> {
    const client = await MongoClient.connect(MONGODDB_URI, {
      useUnifiedTopology: true,
    });

    await client.db('app').collection('users').insertOne({
      id: user.id.value,
      name: user.name.value,
    });

    await client.close();
  }

  public async findById(id: UserId): Promise<User | null> {
    const client = await MongoClient.connect(MONGODDB_URI, {
      useUnifiedTopology: true,
    });

    const docs = await client
      .db('app')
      .collection('users')
      .find({ id: id.value })
      .toArray();

    await client.close();

    if (docs.length === 0) {
      console.log('User not found!');
      return new Promise((resolve) => {
        resolve(null);
      });
    }

    const foundId = docs[0].id;
    const foundName = docs[0].name;

    return new Promise((resolve) => {
      resolve(new User(new UserName(foundName), new UserId(foundId)));
    });
  }

  public async findByName(name: UserName): Promise<User | null> {
    const client = await MongoClient.connect(MONGODDB_URI, {
      useUnifiedTopology: true,
    });

    const docs = await client
      .db('app')
      .collection('users')
      .find({ name: name.value })
      .toArray();

    await client.close();

    if (docs.length === 0) {
      console.log('User not found!');
      return new Promise((resolve) => {
        resolve(null);
      });
    }

    const foundId = docs[0].id;
    const foundName = docs[0].name;

    return new Promise((resolve) => {
      resolve(new User(new UserName(foundName), new UserId(foundId)));
    });
  }

  public findAll(): User[] | null {
    console.log(`finding all users for production!`);
    return [new User(new UserName('User1')), new User(new UserName('User2'))];
  }

  public delete(user: User): void {
    console.log(`Delete ${user.name} for production!`);
  }
}
