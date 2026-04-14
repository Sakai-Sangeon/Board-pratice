import { Response } from 'express';
import * as postService from '../services/postService';
import { AuthRequest } from '../middleware/authMiddleware';

export const getAllPosts = (req: AuthRequest, res: Response): void => {
    postService.getAllPosts((err, results) => {
        if (err) { res.status(500).send(err); return; }
        res.json(results);
    });
};

export const getPostById = (req: AuthRequest, res: Response): void => {
    const id = req.params.id as string;
    postService.getPostById(id, (err, results) => {
        if (err) { res.status(500).send(err); return; }
        if (results.length === 0) { res.status(404).send('게시글 없음'); return; }
        res.json(results[0]);
    });
};

export const createPost = (req: AuthRequest, res: Response): void => {
    const { title, content, author } = req.body;
    const uid = req.user?.uid || '';
    postService.createPost(title, content, author, uid, (err) => {
        if (err) { res.status(500).send(err); return; }
        res.send('Post created');
    });
};

export const updatePost = (req: AuthRequest, res: Response): void => {
    const id = req.params.id as string;
    const { title, content, author } = req.body;
    postService.updatePost(id, title, content, author, (err, result) => {
        if (err) { res.status(500).send(err); return; }
        if (result.affectedRows === 0) { res.status(404).send('게시글 없음'); return; }
        res.send('Post updated');
    });
};

export const deletePost = (req: AuthRequest, res: Response): void => {
    const id = req.params.id as string;
    const { uid, role } = req.user!;

    // 관리자면 바로 삭제
    if (role === 'admin') {
        postService.deletePost(id, (err, result) => {
            if (err) { res.status(500).send(err); return; }
            if (result.affectedRows === 0) { res.status(404).send('게시글 없음'); return; }
            res.send('Post deleted');
        });
        return;
    }

    // 작성자 확인 후 삭제
    postService.getPostUid(id, (err, results) => {
        if (err) { res.status(500).send(err); return; }
        if (results.length === 0) { res.status(404).send('게시글 없음'); return; }

        if (results[0].uid !== uid) {
            res.status(403).json({ message: '삭제 권한이 없습니다' });
            return;
        }

        postService.deletePost(id, (err, result) => {
            if (err) { res.status(500).send(err); return; }
            res.send('Post deleted');
        });
    });
};