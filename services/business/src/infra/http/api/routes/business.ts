import { Router } from 'express';
import { createBusinessController } from '../../../../useCases/business/createBusiness';

const businessRootRouter = Router();

businessRootRouter.post('/', async (req, res) => {
    return createBusinessController.execute(req, res);
});

export default businessRootRouter;
