import { Router } from 'express';
import * as postController from '../controllers/postController';

const router = Router();

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;