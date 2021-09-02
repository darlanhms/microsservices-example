/* eslint-disable no-inner-declarations */
/* eslint-disable max-classes-per-file */
import { StatusCodes } from 'http-status-codes';
import { GenericAppError } from './GenericAppError';

namespace GenericErrors {
    export function getStatusCode(error: GenericAppError): StatusCodes {
        switch (error.constructor) {
            case GenericErrors.NotFound:
                return StatusCodes.NOT_FOUND;
            case GenericErrors.NotCreated:
                return StatusCodes.FORBIDDEN;
            case GenericErrors.NotAuthorized:
                return StatusCodes.UNAUTHORIZED;
            case GenericErrors.Unexpected:
                return StatusCodes.INTERNAL_SERVER_ERROR;
            case GenericErrors.InvalidParam:
                return StatusCodes.BAD_REQUEST;
            default:
                return StatusCodes.INTERNAL_SERVER_ERROR;
        }
    }

    export class NotFound extends GenericAppError {
        constructor(message?: string) {
            super(message || 'Não foi possível encontrar a entidade no momento.');
        }
    }

    export class NotCreated extends GenericAppError {
        constructor(message?: string) {
            super(message || 'Não foi possível criar a instância da entidade no momento.');
        }
    }

    export class NotAuthorized extends GenericAppError {
        constructor(message?: string) {
            super(message || 'Sem permissão para executar essa ação.');
        }
    }

    export class Unexpected extends GenericAppError {
        constructor(message?: string) {
            super(message || 'Não foi possível realizar a requisição');
        }
    }

    export class InvalidParam extends GenericAppError {
        constructor(message?: string) {
            super(message || 'Verifique os campos da requisição');
        }
    }
}

export { GenericErrors };
