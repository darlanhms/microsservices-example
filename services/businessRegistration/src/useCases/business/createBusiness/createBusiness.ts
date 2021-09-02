import { Either, GenericAppError, left, right, UseCase } from '@microsservices-example/shared';
import Business from '../../../domain/business';
import IBusinessRepository from '../../../repositories/IBusinessRepository';
import CreateBusinessDTO from './createBusinessDTO';

type Response = Either<GenericAppError, Business>;

export default class CreateBusiness implements UseCase<CreateBusinessDTO, Response> {
    constructor(private businessRepo: IBusinessRepository) {}

    public async execute(dto: CreateBusinessDTO): Promise<Response> {
        const businessOrError = Business.create(dto);

        if (businessOrError.isLeft()) {
            return left(businessOrError.value);
        }

        const business = await this.businessRepo.insert(businessOrError.value);

        return right(business);
    }
}
