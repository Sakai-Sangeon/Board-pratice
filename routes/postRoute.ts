import { Router } from 'express';
import * as postController from '../controllers/postController';
import * as commentController from '../controllers/commentController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

// 조회는 누구나 가능
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.get('/:id/comments', commentController.getComments);

// 작성, 수정, 삭제는 로그인 필요
router.post('/', authMiddleware, postController.createPost);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);
router.post('/:id/comments', authMiddleware, commentController.createComment);
router.delete('/:id/comments/:commentId', authMiddleware, commentController.deleteComment);

export default router;