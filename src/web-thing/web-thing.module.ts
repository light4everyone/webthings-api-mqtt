import { Module } from '@nestjs/common';
import { WebThingController } from './web-thing.controller';
import { ThingService } from './services';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { configServiceProvider } from '../web-thing/providers/web-thing-config.provider';
import { DatabaseModule } from '../database/database.module';
import { thingProviders } from './providers/thing-repository.provider';
import { propertyProviders } from './providers/property-repository.provider';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule
  ],
  controllers: [WebThingController],
  providers: [
    ...thingProviders,
    ...propertyProviders,
    configServiceProvider,
    ThingService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})
export class WebThingModule {}
