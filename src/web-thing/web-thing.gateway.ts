import * as WebSocket from 'ws';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection } from '@nestjs/websockets';
import { PropertyValueDto } from './dto/property-value.dto';
import { EventBus } from '@nestjs/cqrs';
import { IncomingMessage } from 'http';
import { NewPropertyValueReceivedEvent } from './events/new-property-value-received.event';

type ThingWebSocket = WebSocket & { thingName: string };

@WebSocketGateway({
  path: '/things/:thingName'
} as WebSocket.ServerOptions)
export class WebThingGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: WebSocket.Server;

  constructor(
    private readonly eventBus: EventBus
  ) { }

  @SubscribeMessage('setProperty')
  onSetProperty(client: ThingWebSocket, propertyValue: PropertyValueDto) {
    this.eventBus.publish(
      new NewPropertyValueReceivedEvent(client.thingName, propertyValue)
    );
  }

  handleConnection(client: ThingWebSocket, ...args: any[]) {
    const message = args[0] as IncomingMessage;

    const thingName = message.url.split('/')[2];

    client.thingName = thingName;
  }

  notifyClientsAboutNewPropertyValue(thingName: string, propertyValue: PropertyValueDto) {
    this.server.clients.forEach((client: ThingWebSocket) => {
      if (client.thingName === thingName && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          messageType: 'propertyStatus',
          data: propertyValue
        }));
      }
    });
  }
}
