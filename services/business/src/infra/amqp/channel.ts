import { Channel, connect } from 'amqplib';

type PayloadType = Buffer | Record<string | number | symbol, any> | string | number;

class ChannelHandler {
    private channel: Channel | undefined;

    public async connect() {
        const conn = await connect(`amqp://${process.env.AMQP_HOST || 'localhost'}`);

        this.channel = await conn.createChannel();

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
}

const amqpChannel = new ChannelHandler();

export default amqpChannel;
