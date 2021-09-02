export class Identifier<T> {
    constructor(private value: T) {
        this.value = value;
    }

    equals(id?: Identifier<T>): boolean {
        if (id === null || id === undefined) {
            return false;
        }
        if (!(id instanceof this.constructor)) {
            return false;
        }
        return id.toValue() === this.value;
    }

    /**
     * As it can be undefined this function should be used to know if the identifier is null or undefined for example
     */
    isEmpty(): boolean {
        return Boolean(this.value);
    }

    /**
     * Return raw value of identifier
     */

    toValue(): T {
        return this.value;
    }
}
