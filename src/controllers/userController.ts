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
  if (!user.errors.length) {
    res.status(200).send('Thank you for registering with us').end();
  } else {
    res.status(400).send(user.errors).end();
  }
};

// login controller
export const login = (req: express.Request, res: express.Response) => {};

// logout controller
export const logout = (req: express.Request, res: express.Response) => {};
