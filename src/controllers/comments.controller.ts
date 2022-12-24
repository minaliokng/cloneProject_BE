import { RequestHandler } from 'express';
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentsSchema,
  updateCommentSchema,
} from '../validations/comments.validation';
import CommentsService from '../services/comments.service';

class CommentsController {
  commentsService: CommentsService;

  constructor() {
    this.commentsService = new CommentsService();
  }

  public createComment: RequestHandler = async (req, res, next) => {
    try {
      const { postId } = await createCommentSchema.input.params.validateAsync(req.params);
      const { content } = await createCommentSchema.input.body.validateAsync(req.body);
      const { userId } = res.locals;

      await this.commentsService.createComment(userId, content, postId);

      res.status(201).json({ message: '작성 완료' });
    } catch (err) {
      next(err);
    }
  };

  public getComments: RequestHandler = async (req, res, next) => {
    try {
      const { postId } = await getCommentsSchema.input.params.validateAsync(req.params);

      const comments = await this.commentsService.getComments(postId);

      await getCommentsSchema.output.body.validateAsync(comments);

      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  };

  public updateComment: RequestHandler = async (req, res, next) => {
    try {
      const { commentId } = await updateCommentSchema.input.params.validateAsync(req.params);
      const { content } = await updateCommentSchema.input.body.validateAsync(req.body);
      const { userId } = res.locals;

      await this.commentsService.updateComment(userId, commentId, content);

      res.status(200).json({ message: '수정 완료' });
    } catch (err) {
      next(err);
    }
  };

  public deleteComment: RequestHandler = async (req, res, next) => {
    try {
      const { commentId } = await deleteCommentSchema.input.params.validateAsync(req.params);
      const { userId } = res.locals;

      await this.commentsService.deleteComment(userId, commentId);

      res.status(200).json({ message: '삭제 완료' });
    } catch (err) {
      next(err);
    }
  };
}

export default CommentsController;
