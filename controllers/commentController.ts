import { Request, Response } from 'express';
import * as commentService from '../services/commentService';

// 댓글 조회
export const getComments = (req: Request, res: Response): void => {
    const postId = req.params.id as string;
    commentService.getCommentsByPostId(postId, (err, results) => {
        if (err) { res.status(500).send(err); return; }
        res.json(results);
    });
};

// 댓글 작성
export const createComment = (req: Request, res: Response): void => {
    const postId = req.params.id as string;
    const { content, author } = req.body;
    commentService.createComment(postId, content, author, (err) => {
        if (err) { res.status(500).send(err); return; }
        res.send('Comment created');
    });
};

// 댓글 삭제
export const deleteComment = (req: Request, res: Response): void => {
    const id = req.params.commentId as string;
    commentService.deleteComment(id, (err, result) => {
        if (err) { res.status(500).send(err); return; }
        if (result.affectedRows === 0) { res.status(404).send('댓글 없음'); return; }
        res.send('Comment deleted');
    });
};