// apiMustBeLoggedIn
import express from 'express';
import * as postController from '../controllers/postController';
import * as userController from '../controllers/userController';
import multer from 'multer';

// for upload
// const upload = multer({
//   dest: 'public/uploads/',
//   preservePath: true
// });
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post(
  '/create-post',
  userController.apiMustBeLoggedIn,
  postController.apiCreate
);

router.post(
  '/upload',
  upload.single('file'),
  userController.apiMustBeLoggedIn,
  postController.apiUpload
);

router.post(
  '/find-by-user-id',
  userController.apiMustBeLoggedIn,
  postController.findAllPostsByUserId
);

router.post(
  '/find-all-by-username',
  // userController.apiMustBeLoggedIn,
  userController.apiFindByUserName,
  postController.findAllPostsByUserId
);

export default router;
