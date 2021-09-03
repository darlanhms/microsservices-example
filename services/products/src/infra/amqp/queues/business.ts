import amqpChannel from '../channel';

amqpChannel.consume('business_created', payload => {
    console.log(payload);
});
