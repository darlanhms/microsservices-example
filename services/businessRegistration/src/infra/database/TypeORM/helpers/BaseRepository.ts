import {
    BaseRepositoryMethods,
    Entity,
    GenericEntity,
    MapperInterface,
    RawID,
    UniqueEntityID,
    UpdateFields,
    Repository,
} from '@microsservices-example/shared';
import { getNamespace } from 'cls-hooked';
import { EntityManager, Repository as TypeORMRepository, getManager } from 'typeorm';

export default abstract class BaseRepository<
        RepoEntity extends GenericEntity,
        Domain extends Entity<any>,
        Interface extends GenericEntity,
    >
    extends BaseRepositoryMethods
    implements Repository<Domain>
{
    protected abstract entity: new () => RepoEntity;

    protected abstract mapper: MapperInterface<Domain, Interface>;

    protected usesSoftDelete?: boolean;

    protected set repository(repository: TypeORMRepository<RepoEntity>) {
        this.repository = repository;
    }

    protected get repository(): TypeORMRepository<RepoEntity> {
        return this.entityManager.getRepository(this.entity);
    }

    protected get entityManager(): EntityManager {
        const context = getNamespace('__cls__context');

        if (context && context.active) {
            const transactionalEntityManager = context.get('__typeOrm__transactionalEntityManager');

            if (transactionalEntityManager) {
                // At this point here we have successfully found a transactional EntityManager
                // that was previously saved within the current context.

                // We now use this EntityManager to work.
                return transactionalEntityManager;
            }
        }

        // No specific transactional EntityManager has been found : we use the global EntityManager to work.
        return getManager();
    }

    public async insert(domain: Domain): Promise<Domain> {
        const rawRecord = await this.mapper.toPersistence(domain);

        const recordToSave = this.repository.create(rawRecord);

        const recordSaved = await this.repository.save(recordToSave);

        return this.mapper.toDomain(recordSaved);
    }

    public async update(domain: UpdateFields<Domain>): Promise<RawID> {
        const rawRecord = await this.mapper.toPersistence(domain);

        const recordToSave = this.repository.create(rawRecord);

        const recordSaved = await this.repository.save(recordToSave);

        return this.getId(recordSaved.id);
    }

    public async findById(id: UniqueEntityID | RawID): Promise<Domain | null> {
        const existentRecord = await this.repository.findOne({
            where: {
                id: this.getId(id),
            },
        });

        return existentRecord ? this.mapper.toDomain(existentRecord) : null;
    }

    public async delete(id: UniqueEntityID | RawID): Promise<boolean> {
        if (this.usesSoftDelete) {
            const deleted = await this.repository.softDelete(this.getId(id));

            return deleted.affected ? deleted.affected > 0 : false;
        }

        const deleted = await this.repository.delete(this.getId(id));

        return deleted.affected ? deleted.affected > 0 : false;
    }
}
