import { UserInterface } from 'common/interfaces';
import validator from 'validator';

class User {
  data: UserInterface;
  errors: any[];
  // email: string;
  // password: string;
  // username: string;

  constructor(data: UserInterface) {
    this.data = data;
    this.errors = [];
    // this.email = data?.email;
    // this.password = data?.password;
    // this.username = data?.username;
  }

  validate() {
    // Step #1: Add validation logic here
    // Example: if (this.email && this.password && this.username) {
    //   return true;
    // }
    // return false;
    // You can use a library like "validator" for this purpose
    // Example: return validator.isEmail(this.email) && validator.isLength(this.password, { min: 8 }) && validator.isAlphanumeric(this.username);
    // check email
    if (!validator.isEmail(this.data?.email)) {
      this.errors.push('You must provide a email');
    }
    // check username
    if (!this.data?.username || this.data?.username === '') {
      this.errors.push('You must provide a username');
    }
    if (this.data?.username?.length < 4 || this.data?.username?.length > 12) {
      this.errors.push('username must be between 4 and 12 characters');
    }
    if (
      this.data?.username !== '' &&
      !validator.isAlphanumeric(this.data?.username)
    ) {
      this.errors.push('Username can only contain alphanumeric characters');
    }
    // check password
    if (!this.data?.password || this.data?.password === '') {
      this.errors.push('You must provide a password');
    }
    if (this.data?.password?.length < 6 || this.data?.password?.length > 200) {
      this.errors.push('Password must be between 6 and 200 characters');
    }
  }

  register() {
    // Step #1: Validate data
    this.validate();
    // Step #2: if no validation errors then save user data in db
  }
}

export default User;
