import { Channel, connect } from 'amqplib';

type PayloadType = Buffer | Record<string | number | symbol, any> | string | number;

interface QueueCallback {
    (payload: Buffer | null): void | Promise<void>;
}

interface UnconsumedQueues {
    queue: string;
    callback: QueueCallback;
}

class ChannelHandler {
    private channel: Channel | undefined;

    private toBeConsumedQueues: Array<UnconsumedQueues> = [];

    public async connect() {
        const conn = await connect(`amqp://${process.env.AMQP_HOST || 'localhost'}`);

        this.channel = await conn.createChannel();

        if (this.toBeConsumedQueues.length) {
            this.toBeConsumedQueues.forEach(({ queue, callback }) => {
                this.consume(queue, callback);
            });
        }

        console.log('connected to amqp channel');
    }

    private sanitizePayload(payload: PayloadType): Buffer {
        if (Buffer.isBuffer(payload)) {
            return payload;
        }

        if (['string', 'number'].includes(typeof payload)) {
            return Buffer.from(String(payload));
        }

        if (typeof payload === 'object') {
            return Buffer.from(JSON.stringify(payload));
        }

        throw new Error('Payload type is not from pre-defined types (string | number | object)');
    }

    public async sendToQueue(queue: string, payload: PayloadType): Promise<boolean> {
        if (!this.channel) {
            throw new Error('Channel is not open for send queue');
        }

        await this.channel.assertQueue(queue, {
            durable: false,
        });

        return this.channel.sendToQueue(queue, this.sanitizePayload(payload));
    }

    private async _consume(queue: string, callback: QueueCallback): Promise<void> {
        if (!this.channel) {
            throw new Error('[Channel Logic Error] Private consume called without an open channel');
        }

        await this.channel.assertExchange(queue, 'fanout', {
            durable: true,
        });

        const { queue: q } = await this.channel.assertQueue('', { exclusive: true });

        await this.channel.bindQueue(q, queue, '');

        this.channel.consume(q, msg => {
            if (!msg) {
                callback(null);
                return;
            }

            this.channel?.ack(msg);

            callback(msg.content);
        });
    }

    public async consume(queue: string, callback: QueueCallback): Promise<void> {
        if (!this.channel) {
            this.toBeConsumedQueues.push({ queue, callback });
            return;
        }

        this._consume(queue, callback);
    }
}

const amqpChannel = new ChannelHandler();

export default amqpChannel;
