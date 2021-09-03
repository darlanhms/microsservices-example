import BusinessRepository from '@repositories/implementations/TypeORM/BusinessRepository';
import CreateBusiness from './createBusiness';

const businessRepo = new BusinessRepository();

const createBusiness = new CreateBusiness(businessRepo);

export { createBusiness };
