import express from 'express';
import User from '../models/User';

// home controller
export const home = (req: express.Request, res: express.Response) => {
  res.render('home-guest');
};

// register controller
export const register = async (req: express.Request, res: express.Response) => {
  let user = new User(req?.body);
  try {
    let newUser = await user.register();
    res.status(200).send(newUser).end();
  } catch (error) {
    res.status(400).send(user.errors).end();
  }
};

// login controller
export const login = (req: express.Request, res: express.Response) => {};

// logout controller
export const logout = (req: express.Request, res: express.Response) => {};
