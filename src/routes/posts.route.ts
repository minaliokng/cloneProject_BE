import { Router } from 'express';
import PostsController from '../controllers/posts.controller';
import { requireLogin, passAnyway } from '../middlewares/auth.middleware';
import multeruploader from '../middlewares/multer.uploader';

const postsRouter = Router();
const postsController = new PostsController();

postsRouter.post('/', requireLogin, multeruploader.single('postImage'), postsController.createPost);
postsRouter.get('/', passAnyway, postsController.getAllPostsOrderByTime);
postsRouter.get('/trending', passAnyway, postsController.getAllPostsOrderByCount);
postsRouter.get('/:postId', passAnyway, postsController.getDtailPost);
postsRouter.get('/update/:postId', requireLogin, postsController.getWrittenPost);
postsRouter.patch('/:postId', requireLogin, postsController.updatePost);
postsRouter.delete('/:postId', requireLogin, postsController.deletePost);

export default postsRouter;
