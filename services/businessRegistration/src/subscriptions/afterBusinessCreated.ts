import BusinessCreated from '@domain/events/businessCreated';
import BusinessMapper from '@mappers/businessMapper';
import { DomainEvents, IHandle, QueueDispatcher } from '@microsservices-example/shared';

export default class AfterBusinessCreated implements IHandle {
    constructor(private queueDispatcher: QueueDispatcher) {
        this.setupSubscriptions();
    }

    public setupSubscriptions(): void {
        DomainEvents.register(this.businessCreated.bind(this) as any, BusinessCreated.name);
    }

    private async businessCreated(event: BusinessCreated): Promise<void> {
        try {
            await this.queueDispatcher.sendToQueue('business_created', BusinessMapper.toDTO(event.business));
            console.log('[AfterBusinessCreated] successfully executed after business created event!');
        } catch (error) {
            if (error instanceof Error) {
                console.error(
                    `[AfterBusinessCreated] error on business created send to queue: ${error.message}`,
                );
            } else {
                console.error(`[AfterBusinessCreated] unknown error on business created: ${error}`);
            }
        }
    }
}
