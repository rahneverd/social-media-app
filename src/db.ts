import { MongoClient, Db, Collection } from 'mongodb';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

let db: Db;
let usersCollection: Collection;

const client = new MongoClient(process.env.CONNECTIONSTRING || '');

async function connectToDatabase(): Promise<Db> {
  if (!db) {
    await client.connect();
    db = client.db(process.env.DB);
    usersCollection = db.collection('users');
    console.log('Connected to MongoDB');
  }
  return db;
}
async function startServer() {
  try {
    await connectToDatabase();
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start the server', err);
  }
}

startServer();

export { connectToDatabase, usersCollection };
