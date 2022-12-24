import { Router } from 'express';
import CommentsController from '../controllers/comments.controller';

const commentsRouter = Router();
const commentsController = new CommentsController();

commentsRouter.post('/posts/:postId/comments', commentsController.createComment);
commentsRouter.get('/posts/:postId/comments', commentsController.getComments);
commentsRouter.patch('/comments/:commentId', commentsController.updateComment);
commentsRouter.delete('/comments/:commentId', commentsController.deleteComment);

export default commentsRouter;
