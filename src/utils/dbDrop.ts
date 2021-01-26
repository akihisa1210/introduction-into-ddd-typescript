import { MongoClient } from 'mongodb';

const MONGODDB_URI =
  'mongodb://root:example@mongo:27017/example?authSource=admin';

const drop = async () => {
  const client = await MongoClient.connect(MONGODDB_URI, {
    useUnifiedTopology: true,
  });
  await client.db('app').dropDatabase();
  await client.close();
};

(async () => {
  await drop();
  console.log('Database is dropped');
})();
