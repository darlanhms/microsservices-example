/* eslint-disable @typescript-eslint/no-empty-function */
export class RollbackTransaction {
    public constructor() {}

    public static execute(): RollbackTransaction {
        return new RollbackTransaction();
    }
}
