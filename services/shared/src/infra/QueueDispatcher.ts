type QueueSendPayload = string | number | Record<string | number | symbol, any>;

export interface QueueDispatcher {
    sendToQueue(queue: string, payload: QueueSendPayload): Promise<boolean> | boolean;
}
