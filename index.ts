import express from 'express';
import cookieParser from 'cookie-parser';
import postRoute from './routes/postRoute';
import authRoute from './routes/authRoute';

const app = express();
app.use(express.json());
app.use(cookieParser()); // ← 추가

app.use('/posts', postRoute);
app.use('/auth', authRoute); // ← 추가

app.listen(3000, () => {
    console.log('Server started');
});