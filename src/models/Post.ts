import { PostInterface } from 'common/interfaces';
import { postsCollection } from '../db';
import { ObjectId } from 'mongodb';
import { ParamsDictionary } from 'express-serve-static-core';

class Post {
  data: PostInterface;
  errors: any[];

  constructor(data: PostInterface, authorId: any) {
    this.data = { ...data, author: new ObjectId(authorId) };

    this.errors = [];
  }

  // cleanup
  cleanUp() {
    // if (typeof this.data?.title !== 'string') this.data.title = ''
    if (typeof this.data?.caption !== 'string') this.data.caption = '';
    if (typeof this.data?.image !== 'string') this.data.image = '';

    // get rid of bogus properties
    this.data = {
      caption: this.data?.caption.trim(),
      author: this.data?.author,
      image: this.data?.image,
      createdAt: new Date()
    };
  }

  // validate
  validate() {
    // if (!this.data?.caption?.length)
    //   this.errors.push('Post caption cannot be empty.');
    if (!this.data?.image?.length) this.errors.push('Post image missing.');
  }

  create() {
    return new Promise(async (resolve, reject) => {
      this.cleanUp();
      this.validate();
      if (!this.errors.length) {
        // save post to db
        try {
          let newPost = await postsCollection.insertOne(this.data);
          resolve(newPost);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(this.errors);
      }
    });
  }

  findOneById(id: any) {
    postsCollection.findOne({ _id: id });
  }

  static findAllPostsByUserId(authorId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let posts = await postsCollection
          .find({ author: new ObjectId(authorId) })
          .toArray();
        resolve(posts);
      } catch (error) {
        reject(error);
      }
    });
  }

  static findByUsername(username: string) {}

  upload() {}
}

export default Post;
