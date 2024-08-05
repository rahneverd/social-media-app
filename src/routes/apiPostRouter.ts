// apiMustBeLoggedIn
import express from 'express';
import * as postController from '../controllers/postController';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post(
  '/create',
  userController.apiMustBeLoggedIn,
  postController.apiCreate
);

export default router;
