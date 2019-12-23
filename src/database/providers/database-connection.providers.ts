import { createConnection } from 'typeorm';
import { databaseConnection } from '../../constants/database.constants';
import { connection } from '../postgres.connections';

export const databaseProviders = [
  {
    provide: databaseConnection,
    useFactory: async () => await createConnection(connection),
  },
];
