import express from 'express';
// register controller
export const register = (req: express.Request, res: express.Response) => {
  console.log(req.body);
  res.status(200).send('Thank you for registering with us').end();
};
// login controller
export const login = (req: express.Request, res: express.Response) => {};
// logout controller
export const logout = (req: express.Request, res: express.Response) => {};
// home controller
export const home = (req: express.Request, res: express.Response) => {
  res.render('home-guest');
};
