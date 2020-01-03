import { MessageHandler } from '@nestjs/microservices/interfaces';
import { ServerMqtt } from '@nestjs/microservices/server';
import mqttMatch from './common/mqtt-match';

export class CustomServerMqtt extends ServerMqtt {

  public getHandlerByPattern(pattern: string): MessageHandler | null {

    if (this.messageHandlers.has(pattern)) {
      return this.messageHandlers.get(pattern);
    }

    for (const [key, value] of this.messageHandlers) {
      if (mqttMatch(pattern, key) != null) {
        return value;
      }
    }

    return null;
  }

}
