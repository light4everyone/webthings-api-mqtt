import { Connection } from 'mongoose';
import { thingModelProvider } from '../web-thing.constants';
import { ThingSchema } from '../schemas/thing.schema';
import { databaseConnection } from '../../database/constants/database.constants';

export const thingProviders = [
  {
    provide: thingModelProvider,
    useFactory: (connection: Connection) => connection.model('Thing', ThingSchema),
    inject: [databaseConnection],
  },
];
