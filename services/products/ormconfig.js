const isProd = process.env.NODE_ENV ? process.env.NODE_ENV === 'production' : false;
const rootDir = isProd ? 'dist' : 'src'

module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5433,
    username: 'postgres',
    password: 'postgres',
    database: 'business_db',
    synchronize: false,
    dropSchema: false,
    logging: false,
    entities: [rootDir + '/infra/database/TypeORM/entities/**/*.**'],
    migrations: [rootDir + '/infra/database/TypeORM/migrations/*.**'],
    subscribers: [rootDir + '/infra/database/TypeORM/subscribers/**/*.**'],
    migrationsRun: true,
    cli: {
        migrationsDir: rootDir + '/infra/database/TypeORM/migrations',
    },
};

