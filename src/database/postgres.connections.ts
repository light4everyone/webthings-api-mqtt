import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { resolve } from 'path';

export const connection = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'lightiotcloud',
  entities: [
    resolve(__dirname, '../web-thing/models/*.model.ts')
  ],
  migrationsTableName: 'migrations',
  migrations: [
    './src/database/migrations/*.ts'
  ],
  cli: {
    migrationsDir: './src/database/migrations'
  }
} as PostgresConnectionOptions;
