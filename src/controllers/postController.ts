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
