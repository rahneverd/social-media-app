import { UserInterface } from 'common/interfaces';

class User {
  data: UserInterface;
  // email: string;
  // password: string;
  // username: string;

  constructor(data: UserInterface) {
    this.data = data;
    // this.email = data?.email;
    // this.password = data?.password;
    // this.username = data?.username;
  }

  register() {
    console.log('register');
  }
}

export default User;
