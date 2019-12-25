import { databaseConnection } from '../constants/database.constants';
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: databaseConnection,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost:27017', {
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
