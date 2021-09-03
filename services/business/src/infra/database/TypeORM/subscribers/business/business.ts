import { DomainEvents, UniqueEntityID } from '@microsservices-example/shared';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import BusinessEntity from '../../entities/business/business';

@EventSubscriber()
export class BusinessSubscriber implements EntitySubscriberInterface<BusinessEntity> {
    listenTo(): new () => BusinessEntity {
        return BusinessEntity;
    }

    afterInsert(event: InsertEvent<BusinessEntity>): void {
        DomainEvents.dispatchEventsForAggregate(new UniqueEntityID(event.entity.id));
    }
}
