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
  userController.apiMustBeLoggedIn,
  upload.single('file'),
  postController.apiUpload
);

export default router;
