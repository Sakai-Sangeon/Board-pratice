const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'boarduser',   // 
    password: 'admin',
    database: 'board_db'
});

db.connect((err) => {
    if (err) {
        console.error('DB connection failed :', err);
    } else {
        console.log('DB connection completed');
    }
});

module.exports = db;