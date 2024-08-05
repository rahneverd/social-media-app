export interface UserInterface {
  username: string;
  email: string;
  password: string;
  picture?: string;
}

export interface PostInterface {
  // title: string;
  caption?: string;
  author: any;
  image: string;
  createdAt?: Date;
}
