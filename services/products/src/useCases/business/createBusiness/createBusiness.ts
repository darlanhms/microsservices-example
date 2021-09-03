import Business from '@domain/business';
import { Either, GenericAppError, left, right, UseCase } from '@microsservices-example/shared';
import IBusinessRepository from '@repositories/IBusinessRepository';
import BusinessDTO from 'dtos/business';

type Response = Either<GenericAppError, Business>;

export default class CreateBusiness implements UseCase<BusinessDTO, Response> {
    constructor(private businessRepo: IBusinessRepository) {}

    public async execute(dto: BusinessDTO): Promise<Response> {
        const businessOrError = Business.create(dto);

        if (businessOrError.isLeft()) {
            return left(businessOrError.value);
        }

        const business = await this.businessRepo.insert(businessOrError.value);

        return right(business);
    }
}
