import { Request, Response, NextFunction } from 'express';
import PostsService from '../services/posts.service';
import { postInputPattern, postIdPattern } from '../validations/posts.validation';

class PostsController {
  postsService: PostsService;

  constructor() {
    this.postsService = new PostsService();
  }

  createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = res.locals;
      const { title, content, privateOption } = await postInputPattern.validateAsync(req.body);
      if (req.file) {
        const { location: postImage } = req.file as Express.MulterS3.File;
        await this.postsService.createPost(title, content, privateOption, userId, postImage);
      } else {
        await this.postsService.createPost(title, content, privateOption, userId);
      }
      return res.status(201).json({ message: '게시글 작성 성공' });
    } catch (err) {
      if (req.file) {
        const { location: postImage } = req.file as Express.MulterS3.File;
        const imageKey = postImage.split('/')[postImage.split('/').length - 1];
        await this.postsService.deleteS3Image(imageKey);
      }
      return next(err);
    }
  };

  getAllPostsOrderByTime = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postsService.getPostsOrderByTime();
      return res.status(200).json({ posts });
    } catch (err) {
      return next(err);
    }
  };

  getAllPostsOrderByCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postsService.getPostsOrderByCount();
      return res.status(200).json({ posts });
    } catch (err) {
      return next(err);
    }
  };

  getDtailPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = await postIdPattern.validateAsync(Number(req.params.postId));
      const post = await this.postsService.getPost(postId);
      return res.status(200).json({ post });
    } catch (err) {
      return next(err);
    }
  };

  getWrittenPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = await postIdPattern.validateAsync(Number(req.params.postId));
      const { userId } = res.locals;
      const post = await this.postsService.getWrittenPost(postId, userId);
      return res.status(200).json({ post });
    } catch (err) {
      return next(err);
    }
  };

  updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = res.locals;
      const postId = await postIdPattern.validateAsync(Number(req.params.postId));
      const { title, content, privateOption } = await postInputPattern.validateAsync(req.body);
      await this.postsService.updatePost(title, content, privateOption, userId, postId);
      return res.status(200).json({ message: '수정 완료' });
    } catch (err) {
      return next(err);
    }
  };

  deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = res.locals;
      const postId = await postIdPattern.validateAsync(Number(req.params.postId));
      await this.postsService.deletePost(userId, postId);
      return res.status(200).json({ message: '삭제 완료' });
    } catch (err) {
      return next(err);
    }
  };
}

export default PostsController;
