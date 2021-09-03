import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('business')
export default class BusinessEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ length: 255 })
    slug: string;
}
