import { MongoClient } from 'mongodb';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.CONNECTIONSTRING || '');

async function start() {
  // connect to MongoDB
  await client.connect();
  console.log('Connected to MongoDB');
  // start app
  app.listen(process.env.PORT, () => {
    console.log(`server running on http://localhost:${process.env.PORT}`);
  });
  // create database and collections
  // const db = client.db('mydatabase');
  // const usersCollection = db.collection('users');
  // const postsCollection = db.collection('posts');

  // close the connection
  // await client.close();
  // console.log('Connection to MongoDB closed');
}

start();
export default client.db();
