import { UniqueEntityID } from '../core/UniqueEntityID';
import { RawID, UpdateFields } from '../utils/types';

export interface Repository<Domain> {
    insert(entity: Domain): Promise<Domain> | Domain;

    update(entity: UpdateFields<Domain>): Promise<RawID> | RawID;

    delete(id: UniqueEntityID | RawID): Promise<boolean> | boolean;

    findById(id: UniqueEntityID | RawID): Promise<Domain | null> | (Domain | null);
}
