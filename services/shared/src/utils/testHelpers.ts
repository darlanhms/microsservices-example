export function isTest(): boolean {
    return process.env.JEST_WORKER_ID !== undefined;
}
