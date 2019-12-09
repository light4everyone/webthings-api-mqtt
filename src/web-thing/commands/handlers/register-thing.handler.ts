import { RegisterThingCommand } from '../register-thing.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ThingService } from '../../services';
import { Thing } from '../../models';

@CommandHandler(RegisterThingCommand)
export class RegisterThingHandler implements ICommandHandler<RegisterThingCommand> {

  constructor(
    private readonly thingService: ThingService
  ) { }

  async execute(command: RegisterThingCommand): Promise<void> {
    const newThing: Thing = {
      type: command.type,
      description: command.description,
      properties: command.properties,
      title: command.title,
      name: command.name
    };

    this.thingService.registerThing(newThing);
  }
}
