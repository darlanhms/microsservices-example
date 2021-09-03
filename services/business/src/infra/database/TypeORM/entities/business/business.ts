import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('business')
export default class BusinessEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 500 })
    description: string;

    @Column({ length: 255 })
    slug: string;

    @Column({ length: 255 })
    slogan?: string;
}
