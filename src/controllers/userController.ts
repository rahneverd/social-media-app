import express from 'express';
import User from '../models/User';

// home controller
export const home = (req: express.Request, res: express.Response) => {
  res.render('home-guest');
};

// register controller
export const register = (req: express.Request, res: express.Response) => {
  let user = new User(req?.body);
  user.register();
  res.status(200).send('Thank you for registering with us').end();
};

// login controller
export const login = (req: express.Request, res: express.Response) => {};

// logout controller
export const logout = (req: express.Request, res: express.Response) => {};
