import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { NotifyDeviceAboutNewPropertyValueCommand } from '../notify-device-about-new-property-value.command';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { clientProxyToken } from '../../web-thing.constants';

@CommandHandler(NotifyDeviceAboutNewPropertyValueCommand)
export class NotifyDeviceAboutNewPropertyValueHandler implements ICommandHandler<NotifyDeviceAboutNewPropertyValueCommand> {
  constructor(
    @Inject(clientProxyToken) private readonly client: ClientProxy,
  ) { }

  async execute(command: NotifyDeviceAboutNewPropertyValueCommand) {
    this.client.emit(`things/${command.thingName}/propertyStatus`, command.propertyValue);
  }
}
