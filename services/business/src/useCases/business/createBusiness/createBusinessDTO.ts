import BusinessDTO from '../../../dtos/business';

type CreateBusinessDTO = Omit<BusinessDTO, 'id'>;

export default CreateBusinessDTO;
