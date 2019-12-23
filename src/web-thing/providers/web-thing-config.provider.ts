import { WebThingConfig } from 'src/web-thing/web-thing.config';

export const configServiceProvider = {
  provide: 'WebThingConfig',
  useFactory: () =>
    ({
      baseUrl: process.env.BASE_URL
    }) as WebThingConfig
};
