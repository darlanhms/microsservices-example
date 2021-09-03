import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class BusinessTable1630621610753 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'business',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isUnique: true,
                    },
                    {
                        name: 'slug',
                        type: 'varchar(255)',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('business', true);
    }
}
