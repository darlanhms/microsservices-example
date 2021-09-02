interface IGenericAppError {
    message: string;
}

export abstract class GenericAppError implements IGenericAppError {
    public readonly message: string;

    constructor(message: string) {
        this.message = message;
    }
}
