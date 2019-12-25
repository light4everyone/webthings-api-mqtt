import { Module } from '@nestjs/common';
import { WebThingController } from './web-thing.controller';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { configServiceProvider } from '../web-thing/providers/web-thing-config.provider';
import { DatabaseModule } from '../database/database.module';
import { thingProviders } from './providers/thing-model.provider';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule
  ],
  controllers: [WebThingController],
  providers: [
    configServiceProvider,
    ...thingProviders,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})
export class WebThingModule {}
