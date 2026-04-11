import { Request, Response } from 'express';
import * as postService from '../services/postService';

export const getAllPosts = (req: Request, res: Response): void => {
    postService.getAllPosts((err, results) => {
        if (err) { res.status(500).send(err); return; }
        res.json(results);
    });
};

// 단건 조회 추가
export const getPostById = (req: Request, res: Response): void => {
    const id = req.params.id as string;
    postService.getPostById(id, (err, results) => {
        if (err) { res.status(500).send(err); return; }
        if (results.length === 0) { res.status(404).send('게시글 없음'); return; }
        res.json(results[0]);
    });
};

export const createPost = (req: Request, res: Response): void => {
    const { title, content, author } = req.body;
    postService.createPost(title, content, author, (err) => {
        if (err) { res.status(500).send(err); return; }
        res.send('Post created');
    });
};

export const updatePost = (req: Request, res: Response): void => {
    const id = req.params.id as string;
    const { title, content, author } = req.body;
    postService.updatePost(id, title, content, author, (err, result) => {
        if (err) { res.status(500).send(err); return; }
        if (result.affectedRows === 0) { res.status(404).send('게시글 없음'); return; }
        res.send('Post updated');
    });
};

export const deletePost = (req: Request, res: Response): void => {
    const id = req.params.id as string;
    postService.deletePost(id, (err, result) => {
        if (err) { res.status(500).send(err); return; }
        if (result.affectedRows === 0) { res.status(404).send('게시글 없음'); return; }
        res.send('Post deleted');
    });
};