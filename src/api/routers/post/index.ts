import { Router } from 'express';

import { PostController } from '@controllers/post.controller';
import { authenticationV2 } from '@middlewares/authentication';

const router = Router();

router.post('/:id/views', PostController.increasePostViews);

router.get('/templates/:id', PostController.getPostTemplate);
router.get('/templates', PostController.getPostTemplates);
router.get('/categories', PostController.getPostCategories);
router.get('/all', authenticationV2, PostController.getAllPosts);
router.get('/:id', PostController.getPost);
router.get('/', PostController.getPublishedPosts);

router.use(authenticationV2);

router.get('/unpublished', PostController.getUnpublishedPosts);

router.post('/templates', PostController.createPostTemplate);
router.put('/templates/:id', PostController.updatePostTemplate);
router.delete('/templates/:id', PostController.deletePostTemplate);

router.post('/categories', PostController.createPostCategory);
router.put('/categories/:id', PostController.updatePostCategory);
router.delete('/categories/:id', PostController.deletePostCategory);

router.put('/:id', PostController.updatePost);
router.post('/', PostController.createPost);
router.delete('/:id', PostController.deletePost);

module.exports = router;
