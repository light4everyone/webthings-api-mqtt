import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { WebThingGateway } from '../../web-thing.gateway';
import { NotifyClientsAboutNewPropertyValueCommand } from '../notify-clients-about-new-property-value.command';

@CommandHandler(NotifyClientsAboutNewPropertyValueCommand)
export class NotifyClientsAboutNewPropertyValueHandler implements ICommandHandler<NotifyClientsAboutNewPropertyValueCommand> {
  constructor(
    private readonly gateway: WebThingGateway
  ) { }

  async execute(command: NotifyClientsAboutNewPropertyValueCommand) {
    this.gateway.notifyClientsAboutNewPropertyValue(command.thingName, command.propertyValue);
  }
}
