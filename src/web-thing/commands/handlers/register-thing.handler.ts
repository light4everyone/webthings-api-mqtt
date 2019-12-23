import { RegisterThingCommand } from '../register-thing.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ThingService } from '../../services';
import { Thing, Property } from '../../models';

@CommandHandler(RegisterThingCommand)
export class RegisterThingHandler implements ICommandHandler<RegisterThingCommand> {

  constructor(
    private readonly thingService: ThingService
  ) { }

  async execute(command: RegisterThingCommand): Promise<void> {
    // const thing = command.thing;

    // const newThing: Thing = {
    //   type: thing.type,
    //   description: thing.description,
    //   properties: thing.properties.map(p => ({
    //     'title': p.title,
    //     'description': p.description,
    //     '@type': p['@type'],
    //     'type': p.type,
    //     'name': p.name
    //   } as Property)),
    //   title: thing.title,
    //   name: thing.name,
    //   value: null
    // };

    // this.thingService.registerThing(newThing);
  }
}
