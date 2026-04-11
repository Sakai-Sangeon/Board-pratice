import { Router } from 'express';
import * as postController from '../controllers/postController';
import * as commentController from '../controllers/commentController';

const router = Router();

// 게시글 CRUD
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);          // 단건 조회 추가
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

// 댓글
router.get('/:id/comments', commentController.getComments);
router.post('/:id/comments', commentController.createComment);
router.delete('/:id/comments/:commentId', commentController.deleteComment);

export default router;