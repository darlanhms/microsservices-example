import { UniqueEntityID } from '../core/UniqueEntityID';

export interface IGuardResult {
    succeeded: boolean;
    message?: string;
}

export interface IGuardArgument {
    argument: unknown;
    argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
    public static combine(guardResults: IGuardResult[]): IGuardResult {
        for (const result of guardResults) {
            if (result.succeeded === false) return result;
        }

        return { succeeded: true };
    }

    public static greaterThan(minValue: number, actualValue: number): IGuardResult {
        return actualValue > minValue
            ? { succeeded: true }
            : {
                  succeeded: false,
                  message: `O número informado {${actualValue}} não é maior que ${minValue}`,
              };
    }

    public static againstAtLeast(numChars: number, text: string): IGuardResult {
        return text.length >= numChars
            ? { succeeded: true }
            : {
                  succeeded: false,
                  message: `O texto deve ter pelo menos ${numChars} caracteres.`,
              };
    }

    public static againstAtMost(numChars: number, text: string): IGuardResult {
        return text.length <= numChars
            ? { succeeded: true }
            : {
                  succeeded: false,
                  message: `O texto tem mais de ${numChars} caracteres.`,
              };
    }

    public static againstNullOrUndefined(argument: unknown, argumentName: string): IGuardResult {
        if (
            argument instanceof UniqueEntityID &&
            (argument.toValue() === null || argument.toValue() === undefined)
        ) {
            return { succeeded: false, message: `${argumentName} é um campo obrigatório` };
        }

        if (argument === null || argument === undefined) {
            return { succeeded: false, message: `${argumentName} é um campo obrigatório` };
        }
        return { succeeded: true };
    }

    public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): IGuardResult {
        for (const arg of args) {
            const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
            if (!result.succeeded) return result;
        }

        return { succeeded: true };
    }

    public static isOneOf<T>(value: T, validValues: T[], argumentName: string): IGuardResult {
        let isValid = false;
        for (const validValue of validValues) {
            if (value === validValue) {
                isValid = true;
            }
        }

        if (isValid) {
            return { succeeded: true };
        }
        return {
            succeeded: false,
            message: `${argumentName} (${value}) não está dentro dos itens permitidos (${validValues.join(
                ', ',
            )})`,
        };
    }

    public static inRange(num: number, min: number, max: number, argumentName: string): IGuardResult {
        const isInRange = num >= min && num <= max;
        if (!isInRange) {
            return { succeeded: false, message: `${argumentName} não está entre ${min} e ${max}.` };
        }
        return { succeeded: true };
    }

    public static allInRange(numbers: number[], min: number, max: number, argumentName: string): IGuardResult {
        let failingResult: IGuardResult | null = null;

        for (const num of numbers) {
            const numIsInRangeResult = this.inRange(num, min, max, argumentName);
            if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
        }

        if (failingResult) {
            return { succeeded: false, message: `${argumentName} não está dentro do permitido.` };
        }
        return { succeeded: true };
    }
}
