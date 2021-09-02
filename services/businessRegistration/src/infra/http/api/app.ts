import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.get('/', (req, res) => {
    return res.send(new Date());
});

export default app;
