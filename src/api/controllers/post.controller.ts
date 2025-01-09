import { Request, Response, NextFunction } from 'express';
import { OK } from '../core/success.response';

import {
  createPost,
  getAllPosts,
  getPublishedPosts,
  getUnpublishedPosts,
  updatePost,
  deletePost,
  increasePostViews,
  getPostDetail,
  createPostCategory,
  getPostCategories,
  createPostTemplate,
  getPostTemplates,
  updatePostTemplate,
  deletePostTemplate,
  updatePostCategory,
  deletePostCategory,
  getPostTemplate,
} from '../services/post.service';
import { authenticationV2 } from '@middlewares/authentication';

export class PostController {
  static async createPost(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Post created successfully',
      metadata: await createPost(req.body),
    });
  }

  static async getPublishedPosts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Posts fetched successfully',
      metadata: await getPublishedPosts(req.query),
    });
  }

  static async getAllPosts(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Posts fetched successfully',
      metadata: await getAllPosts(req.query),
    });
  }

  static async getUnpublishedPosts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Posts fetched successfully',
      metadata: await getUnpublishedPosts(),
    });
  }

  static async getPost(req: Request, res: Response, next: NextFunction) {
    const post = await getPostDetail(req.params.id);
    if (!post.pst_isPublished) {
      await authenticationV2(req, res);
    }

    return OK({
      res,
      message: 'Post fetched successfully',
      metadata: post,
    });
  }

  static async updatePost(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Post updated successfully',
      metadata: await updatePost(req.params.id, req.body),
    });
  }

  static async increasePostViews(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Post views increased successfully',
      metadata: await increasePostViews(req.params.id),
    });
  }

  static async deletePost(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Post deleted successfully',
      metadata: await deletePost(req.params.id),
    });
  }

  static async createPostCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Post category created successfully',
      metadata: await createPostCategory(req.body),
    });
  }

  static async getPostCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Post categories fetched successfully',
      metadata: await getPostCategories(),
    });
  }

  static async updatePostCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Post category updated successfully',
      metadata: await updatePostCategory(req.params.id, req.body),
    });
  }

  static async deletePostCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Post category deleted successfully',
      metadata: await deletePostCategory(req.params.id),
    });
  }

  static async createPostTemplate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Post template created successfully',
      metadata: await createPostTemplate(req.body),
    });
  }

  static async updatePostTemplate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Post template updated successfully',
      metadata: await updatePostTemplate(req.params.id, req.body),
    });
  }

  static async deletePostTemplate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Post template deleted successfully',
      metadata: await deletePostTemplate(req.params.id),
    });
  }

  static async getPostTemplates(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Post templates fetched successfully',
      metadata: await getPostTemplates(),
    });
  }

  static async getPostTemplate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Post template fetched successfully',
      metadata: await getPostTemplate(req.params.id),
    });
  }
}
