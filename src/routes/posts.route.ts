import { Router } from 'express';
import PostsController from '../controllers/posts.controller';
import { requireLogin, passAnyway } from '../middlewares/auth.middleware';

const postsRouter = Router();
const postsController = new PostsController();

postsRouter.post('/', requireLogin, postsController.createPost);
postsRouter.get('/', passAnyway, postsController.getAllPosts);
postsRouter.get('/:postId', passAnyway, postsController.getDtailPost);
postsRouter.get('/update/:postId', requireLogin, postsController.getWrittenPost);
postsRouter.patch('/:postId', requireLogin, postsController.updatePost);
postsRouter.delete('/:postId', requireLogin, postsController.deletePost);
export default postsRouter;
