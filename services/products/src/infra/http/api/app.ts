import express from 'express';
import cors from 'cors';
import { createNamespace } from 'cls-hooked';
import router from './routes';

const context = createNamespace('__cls__context');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.use((req, res, next) => {
    context.run(() => next());
});

app.use('/api', router);

app.get('/', (req, res) => {
    return res.send(new Date());
});

export default app;
