import db from '../db';
import { OkPacket, RowDataPacket } from 'mysql2';

export const getAllPosts = (callback: (err: any, results: RowDataPacket[]) => void): void => {
    db.query<RowDataPacket[]>('SELECT * FROM posts', callback);
};

export const getPostById = (id: string, callback: (err: any, results: RowDataPacket[]) => void): void => {
    db.query<RowDataPacket[]>('SELECT * FROM posts WHERE id = ?', [id], callback);
};

// uid 추가
export const createPost = (title: string, content: string, author: string, uid: string, callback: (err: any, result: OkPacket) => void): void => {
    db.query<OkPacket>(
        'INSERT INTO posts (title, content, author, uid) VALUES (?, ?, ?, ?)',
        [title, content, author, uid],
        callback
    );
};

export const updatePost = (id: string, title: string, content: string, author: string, callback: (err: any, result: OkPacket) => void): void => {
    db.query<OkPacket>(
        'UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?',
        [title, content, author, id],
        callback
    );
};

export const deletePost = (id: string, callback: (err: any, result: OkPacket) => void): void => {
    db.query<OkPacket>('DELETE FROM posts WHERE id = ?', [id], callback);
};

// 작성자 uid 조회용
export const getPostUid = (id: string, callback: (err: any, results: RowDataPacket[]) => void): void => {
    db.query<RowDataPacket[]>('SELECT uid FROM posts WHERE id = ?', [id], callback);
};