import { databaseConnection, propertyRepository } from '../../constants/database.constants';
import { Connection } from 'typeorm';
import { Property } from '../models';

export const propertyProviders = [
  {
    provide: propertyRepository,
    useFactory: (connection: Connection) => connection.getRepository(Property),
    inject: [databaseConnection],
  },
];
