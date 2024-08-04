import { UserInterface } from 'common/interfaces';
import express from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

// home controller
export const home = (req: express.Request, res: express.Response) => {
  res.render('home-guest');
};

export const apiMustBeLoggedIn = (
  req: express.Request & { apiUser: any },
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    req['apiUser'] = jwt.verify(req?.body?.token, process.env.JWTSECRET || '');
    next();
  } catch (error) {
    res.status(403).json('Sorry, you must provide a valid token').end();
  }
};

// register controller
export const register = async (req: express.Request, res: express.Response) => {
  let user = new User(req?.body);
  try {
    let newUser = await user.register();
    res.status(200).send(newUser).end();
  } catch (error) {
    res.status(400).send(error).end();
  }
};

// api register controller
export const apiRegister = async (
  req: express.Request,
  res: express.Response
) => {
  let user = new User(req?.body);
  try {
    let newUser = await user.register();
    res.status(200).send(newUser).end();
  } catch (error) {
    res.status(400).send(error).end();
  }
};

// login controller
export const login = async (req: express.Request, res: express.Response) => {
  let user = new User(req?.body);
  console.log(user);
  try {
    let newUser: any = await user.login();
    console.log(newUser);
    let token = await jwt.sign(
      { _id: newUser.data._id },
      process.env.JWTSECRET || '',
      { expiresIn: '30m' }
    );
    console.log(token);
    res
      .status(200)
      .json({
        token: token,
        username: newUser?.data?.username,
        _id: newUser?.data?._id,
        email: newUser?.data?.email
      })
      .end();
  } catch (error) {
    res.status(400).json(error).end();
  }
};

// api login controller
export const apiLogin = async (req: express.Request, res: express.Response) => {
  let user = new User(req?.body);
  console.log(user);
  try {
    let newUser: any = await user.login();
    console.log(newUser);
    let token = await jwt.sign(
      { _id: newUser.data._id },
      process.env.JWTSECRET || '',
      { expiresIn: '30m' }
    );
    console.log(token);
    res
      .status(200)
      .json({
        token: token,
        username: newUser?.data?.username,
        _id: newUser?.data?._id,
        email: newUser?.data?.email,
        picture: newUser?.data?.picture
      })
      .end();
  } catch (error) {
    res.status(400).json(error).end();
  }
};

// logout controller
export const logout = (req: express.Request, res: express.Response) => {};

// api logout controller
export const apiLogout = (req: express.Request, res: express.Response) => {};
