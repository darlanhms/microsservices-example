import BusinessRepository from '../../../repositories/implementations/TypeORM/BusinessRepository';
import CreateBusiness from './createBusiness';
import CreateBusinessController from './createBusinessController';

const businessRepo = new BusinessRepository();

const createBusiness = new CreateBusiness(businessRepo);

const createBusinessController = new CreateBusinessController(createBusiness);

export { createBusiness, createBusinessController };
