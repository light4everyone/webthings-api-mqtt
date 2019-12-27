import { Server, ServerOptions } from 'ws';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayConnection } from '@nestjs/websockets';
import { PropertyValueDto } from './dto/property-value.dto';
import { EventBus } from '@nestjs/cqrs';
import { IncomingMessage } from 'http';
import { NewPropertyValueReceivedEvent } from './events/new-property-value-received.event';

@WebSocketGateway({
  path: '/things'
} as ServerOptions)
export class ThingsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly eventBus: EventBus
  ) { }

  @SubscribeMessage('setProperty')
  onSetProperty(client: any, propertyValue: PropertyValueDto) {
    const pattern = /\/things\/\w+$/;

    if (!pattern.test(client.url)) {
      return;
    }

    const thingName = client.url.split('/')[3];

    this.eventBus.publish(
      new NewPropertyValueReceivedEvent(thingName, propertyValue)
    );
  }

  handleConnection(client: any, ...args: any[]) {
    const message = args[0] as IncomingMessage;
    client.url = message.url;
  }
}
