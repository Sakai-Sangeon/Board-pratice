import express from 'express';
import postRoute from './routes/postRoute';

const app = express();
app.use(express.json());

app.use('/posts', postRoute);

app.listen(3000, () => {
    console.log('Server started');
});