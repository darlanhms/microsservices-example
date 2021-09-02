import BusinessMapper from '@mappers/businessMapper';
import { BaseController } from '@microsservices-example/shared';
import { Response } from 'express';
import CreateBusiness from './createBusiness';

export default class CreateBusinessController extends BaseController {
    constructor(private useCase: CreateBusiness) {
        super();
    }

    public async executeImplementation(): Promise<Response> {
        const result = await this.useCase.execute(this.req.body);

        if (result.isLeft()) {
            return this.genericErrorResponse(result.value);
        }

        return this.ok(BusinessMapper.toDTO(result.value));
    }
}
