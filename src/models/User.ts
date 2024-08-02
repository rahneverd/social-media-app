import { UserInterface } from 'common/interfaces';

// const User = function (data: any): User {
//   return {
//     email: '',
//     username: '',
//     password: ''
//   };
// };

class User {
  // myDonuts: DonutChartModel[] = [];
  email: string;
  password: string;
  username: string;

  constructor(data: UserInterface) {
    this.email = data?.email;
    this.password = data?.password;
    this.username = data?.username;
  }
}

export default User;
