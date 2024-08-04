import { UserInterface } from 'common/interfaces';
import validator from 'validator';
import { usersCollection } from '../db';
import bcrypt from 'bcryptjs';

class User {
  data: UserInterface;
  errors: any[];

  constructor(data: UserInterface) {
    this.data = data;
    this.errors = [];
  }

  cleanUp() {
    if (typeof this.data?.email !== 'string') {
      this.data.email = '';
    }
    if (typeof this.data?.username !== 'string') {
      this.data.username = '';
    }
    if (typeof this.data?.password !== 'string') {
      this.data.password = '';
    }
    // get rid of any bogus properties
    this.data = {
      username: this.data?.username?.trim().toLocaleLowerCase(),
      email: this.data?.email?.trim().toLocaleLowerCase(),
      password: this.data?.password
    };
  }

  validate(condition?: string) {
    // Step #1: Add validation logic here
    // Example: if (this.email && this.password && this.username) {
    //   return true;
    // }
    // return false;
    // You can use a library like "validator" for this purpose
    // Example: return validator.isEmail(this.email) && validator.isLength(this.password, { min: 8 }) && validator.isAlphanumeric(this.username);
    // check email
    if (!validator.isEmail(this.data?.email) && condition !== 'skipEmail') {
      this.errors.push('You must provide a email');
    }
    // check username
    if (
      !this.data?.username ||
      (this.data?.username === '' && condition !== 'skipUsername')
    ) {
      this.errors.push('You must provide a username');
    }
    if (
      (this.data?.username?.length < 4 || this.data?.username?.length > 12) &&
      condition !== 'skipUsername'
    ) {
      this.errors.push('username must be between 4 and 12 characters');
    }
    if (
      this.data?.username !== '' &&
      !validator.isAlphanumeric(this.data?.username) &&
      condition !== 'skipUsername'
    ) {
      this.errors.push('Username can only contain alphanumeric characters');
    }
    // check password
    if (
      (!this.data?.password || this.data?.password === '') &&
      condition !== 'skipPassword'
    ) {
      this.errors.push('You must provide a password');
    }
    if (
      (this.data?.password?.length < 6 || this.data?.password?.length > 40) &&
      condition !== 'skipPassword'
    ) {
      this.errors.push('Password must be between 6 and 40 characters');
    }
  }

  register() {
    return new Promise(async (resolve, reject) => {
      // Step #0: Make sure all data is provided and clean it
      this.cleanUp();
      // Step #1: Validate data
      this.validate();
      // Step #2: if no validation errors then save user data in db
      if (this.errors.length) {
        reject(this.errors);
      } else {
        // encrypt user password
        let salt = bcrypt.genSaltSync(10);
        this.data.password = bcrypt.hashSync(this.data?.password, salt);
        // save user to db
        let newUser = await usersCollection.insertOne(this.data);
        resolve(newUser);
      }
    });
  }

  login() {
    return new Promise(async (resolve, reject) => {
      // Step #0: Make sure all data is provided and clean it
      this.cleanUp();
      // Step #1: Validate data
      this.validate('skipEmail');
      // Step #2: if no validation errors then save user data in db
      if (this.errors.length) {
        reject(this.errors);
      } else {
        let newUser: any = await usersCollection.findOne({
          username: this.data?.username
        });
        if (
          newUser &&
          bcrypt.compareSync(this.data?.password, newUser?.password)
        ) {
          newUser = {
            data: {
              _id: newUser._id,
              username: newUser.username,
              email: newUser.email
            }
          };
          resolve(newUser);
        } else {
          reject(['Invalid username or password']);
        }
      }
    });
  }
}

export default User;
