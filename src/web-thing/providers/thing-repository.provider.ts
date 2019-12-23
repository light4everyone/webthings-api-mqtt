import { Thing } from '../models';
import { thingRepository, databaseConnection } from '../../constants/database.constants';
import { Connection } from 'typeorm';

export const thingProviders = [
  {
    provide: thingRepository,
    useFactory: (connection: Connection) => connection.getRepository(Thing),
    inject: [databaseConnection],
  },
];
