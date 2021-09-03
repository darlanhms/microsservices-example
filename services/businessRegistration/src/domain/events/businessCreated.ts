import Business from '@domain/business';
import { IDomainEvent, UniqueEntityID } from '@microsservices-example/shared';

export default class BusinessCreated implements IDomainEvent {
    public dateTimeOccurred: Date;

    constructor(public business: Business) {
        this.dateTimeOccurred = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.business.id;
    }
}
