import { AllOptional, GenericEntity } from '../utils/types';

export interface MapperInterface<Domain, Interface extends GenericEntity> {
    toDomain(raw: Interface): Promise<Domain> | Domain;
    toPersistence(raw: AllOptional<Domain>): Promise<AllOptional<Interface>> | AllOptional<Interface>;
}
