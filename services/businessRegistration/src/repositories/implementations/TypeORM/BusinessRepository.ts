import Business from '../../../domain/business';
import IBusiness from '../../../infra/database/entities/business/business';
import BusinessEntity from '../../../infra/database/TypeORM/entities/business/business';
import BaseRepository from '../../../infra/database/TypeORM/helpers/BaseRepository';
import BusinessMapper from '../../../mappers/businessMapper';
import IBusinessRepository from '../../IBusinessRepository';

export default class BusinessRepository
    extends BaseRepository<BusinessEntity, Business, IBusiness>
    implements IBusinessRepository
{
    mapper = BusinessMapper;

    entity = BusinessEntity;
}
