import { Module } from '@nestjs/common';
import { WebThingController } from './web-thing.controller';
import { ThingService } from './services';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { WebThingConfig } from './web-thing.config';

const configServiceProvider = {
  provide: 'WebThingConfig',
  useFactory: () =>
    ({
      baseUrl: process.env.BASE_URL
    }) as WebThingConfig
};

@Module({
  imports: [CqrsModule],
  controllers: [WebThingController],
  providers: [
    configServiceProvider,
    ThingService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})
export class WebThingModule {}
