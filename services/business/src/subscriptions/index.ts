import amqpChannel from '@infra/amqp/channel';
import AfterBusinessCreated from './afterBusinessCreated';

new AfterBusinessCreated(amqpChannel);
