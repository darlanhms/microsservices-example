import { Router } from 'express';
import businessRootRouter from './business';

const router = Router();

router.use('/businesses', businessRootRouter);

export default router;
