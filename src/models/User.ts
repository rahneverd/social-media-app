import { UserInterface } from 'common/interfaces';

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
    // check username
    if (!this.data?.username || this.data?.username === '') {
      this.errors.push('You must provide a username');
    }
    // check email
    if (!this.data?.email || this.data?.email === '') {
      this.errors.push('You must provide a email');
    }
    // check password
    if (!this.data?.password || this.data?.password === '') {
      this.errors.push('You must provide a password');
    }
  }

  register() {
    // Step #1: Validate data
    this.validate();
    // Step #2: if no validation errors then save user data in db
  }
}

export default User;
