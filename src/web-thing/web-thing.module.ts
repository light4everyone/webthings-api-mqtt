import { Module, CacheModule } from '@nestjs/common';
import { WebThingController } from './web-thing.controller';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../database/database.module';
import { thingProviders } from './providers/thing-model.provider';
import { ThingsGateway } from './web-thing.gateway';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    CacheModule.register({
      ttl: 3600
    })
  ],
  controllers: [WebThingController],
  providers: [
    ThingsGateway,
    ...thingProviders,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})
export class WebThingModule {}
