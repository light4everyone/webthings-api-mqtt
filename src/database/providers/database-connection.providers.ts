import { databaseConnection } from '../constants/database.constants';
import * as mongoose from 'mongoose';
import { env } from '../../environments';

export const databaseProviders = [
  {
    provide: databaseConnection,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(env.mongodb.mongoDbConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: 'webthingcloud',
        authSource: 'admin',
        user: 'admin',
        pass: 'admin'
      })
  },
];
