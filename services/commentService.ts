import db from '../db';
import { OkPacket, RowDataPacket } from 'mysql2';

// 댓글 전체 조회
export const getCommentsByPostId = (postId: string, callback: (err: any, results: RowDataPacket[]) => void): void => {
    db.query<RowDataPacket[]>(
        'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC',
        [postId],
        callback
    );
};

// 댓글 작성
export const createComment = (postId: string, content: string, author: string, callback: (err: any, result: OkPacket) => void): void => {
    db.query<OkPacket>(
        'INSERT INTO comments (post_id, content, author) VALUES (?, ?, ?)',
        [postId, content, author],
        callback
    );
};

// 댓글 삭제
export const deleteComment = (id: string, callback: (err: any, result: OkPacket) => void): void => {
    db.query<OkPacket>(
        'DELETE FROM comments WHERE id = ?',
        [id],
        callback
    );
};