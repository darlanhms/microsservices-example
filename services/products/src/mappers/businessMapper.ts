import { AllOptional, UniqueEntityID } from '@microsservices-example/shared';
import Business from '@domain/business';
import BusinessDTO from '../dtos/business';
import IBusiness from '../infra/database/entities/business/business';

export default class BusinessMapper {
    public static toDomain(business: IBusiness): Business {
        return Business.create(
            {
                slug: business.slug,
            },
            new UniqueEntityID(business.id),
        ).value as Business;
    }

    public static toPersistence(business: AllOptional<Business>): AllOptional<IBusiness> {
        return {
            id: business.id?.toValue(),
            slug: business.slug,
        };
    }

    public static toDTO(business: Business): BusinessDTO {
        return {
            id: business.id.toValue(),
            slug: business.slug,
        };
    }
}
