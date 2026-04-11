import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'boarduser',
    password: 'admin',
    database: 'board_db',
    charset: 'utf8mb4'
});

db.connect((err) => {
    if (err) {
        console.error('DB connection failed :', err);
    } else {
        console.log('DB connection completed');
    }
});

export default db;