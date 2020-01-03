import { Module, CacheModule } from '@nestjs/common';
import { WebThingController } from './web-thing.controller';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../database/database.module';
import { thingProviders } from './providers/thing-model.provider';
import { WebThingGateway } from './web-thing.gateway';
import { WebThingSagas } from './web-thing.sagas';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { clientProxyToken } from './web-thing.constants';
import { WebThingMqttController } from './web-thing-mqtt.controller';
import { env } from '../environments';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    CacheModule.register({
      ttl: 3600
    }),
    ClientsModule.register([
      {
        name: clientProxyToken,
        transport: Transport.MQTT,
        options: {
          url: env.mosquitto.mosquittoUrl
        }
      }
    ]),
  ],
  controllers: [
    WebThingController,
    WebThingMqttController
  ],
  providers: [
    WebThingSagas,
    WebThingGateway,
    ...thingProviders,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})
export class WebThingModule { }
