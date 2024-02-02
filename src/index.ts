import express from 'express';
import { PORT } from './config/config';

const app = express();


app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

