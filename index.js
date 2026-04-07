const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

// 글 생성
app.post('/posts', (req, res) => {
    const { title, content, author } = req.body;

    db.query(
        'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)',
        [title, content, author],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send('Post created');
        }
    );
});

// 글 조회
app.get('/posts', (req, res) => {
    db.query('SELECT * FROM posts', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// 게시글 수정
app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;

    db.query(
        'UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?',
        [title, content, author, id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.affectedRows === 0) return res.status(404).send('게시글 없음');
            res.send('Post updated');
        }
    );
});

// 게시글 삭제
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;

    db.query(
        'DELETE FROM posts WHERE id = ?',
        [id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.affectedRows === 0) return res.status(404).send('게시글 없음');
            res.send('Post deleted');
        }
    );
});

// ← 항상 맨 아래!
app.listen(3000, () => {
    console.log('Server started');
});