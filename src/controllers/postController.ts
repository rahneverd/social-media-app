import express from 'express';
import Post from '../models/Post';

export const apiCreate = async (req: any, res: express.Response) => {
  try {
    let post = new Post(req?.body, req?.apiUser);
    let newPost = await post.create();
    res.status(200).json(newPost).end();
  } catch (error) {
    res.status(404).json(error).end();
  }
};

export const apiUpload = async (
  req: express.Request,
  res: express.Response
) => {
  if (req?.file?.path) {
    res.status(200).json(req.file?.path?.slice(7)).end();
  } else {
    res.status(400).send('failed');
  }
};

export const findAllPostsByUserId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let posts = await Post.findAllPostsByUserId(
      req.body?._id ? req.body?._id : req.body?.userId
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error).end();
  }
};
