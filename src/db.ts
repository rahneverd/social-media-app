import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.CONNECTIONSTRING || '');

async function start() {
  // connect to MongoDB
  await client.connect();
  console.log('Connected to MongoDB');
  // create database and collections
  // const db = client.db('mydatabase');
  // const usersCollection = db.collection('users');
  // const postsCollection = db.collection('posts');

  // close the connection
  // await client.close();
  // console.log('Connection to MongoDB closed');
}
