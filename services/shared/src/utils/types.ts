/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UniqueEntityID } from '../core/UniqueEntityID';

export type UpdateFields<T> = {
    [P in keyof T]?: T[P];
} & {
    id: UniqueEntityID | RawID;
};

export type AllOptional<T> = {
    [P in keyof T]?: T[P] | undefined;
};

export type RawID = number | string;

export type GenericEntity = Record<string | number | symbol, any> & { id: UniqueEntityID | RawID };

export type GenericTokenPayload = string | object | Buffer;
