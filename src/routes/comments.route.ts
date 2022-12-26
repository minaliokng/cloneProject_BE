import { Router } from 'express';
import CommentsController from '../controllers/comments.controller';
import { requireLogin } from '../middlewares/auth.middleware';

const commentsRouter = Router();
const commentsController = new CommentsController();

commentsRouter.post('/posts/:postId/comments', requireLogin, commentsController.createComment);
commentsRouter.get('/posts/:postId/comments', commentsController.getComments);
commentsRouter.patch('/comments/:commentId', requireLogin, commentsController.updateComment);
commentsRouter.delete('/comments/:commentId', requireLogin, commentsController.deleteComment);

export default commentsRouter;
