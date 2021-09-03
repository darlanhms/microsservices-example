import { createBusiness } from '@useCases/business/createBusiness';
import amqpChannel from '../channel';

amqpChannel.consume('business_created', async payload => {
    if (!payload) {
        console.error('Empty payload on business created queue');
        return;
    }

    const dto = JSON.parse(payload?.toString());

    const result = await createBusiness.execute(dto);

    if (result.isLeft()) {
        console.error(`Business created event error: ${result.value.message}`);
    }
});
