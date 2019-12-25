import { RegisterThingCommand } from '../register-thing.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Thing, Property } from '../../models';
import { Inject } from '@nestjs/common';
import { thingModelProvider } from '../../constants/model-provider.constants';
import { Model } from 'mongoose';

@CommandHandler(RegisterThingCommand)
export class RegisterThingHandler implements ICommandHandler<RegisterThingCommand> {

  constructor(
    @Inject(thingModelProvider) private readonly thingModel: Model<Thing>
  ) { }

  async execute(command: RegisterThingCommand): Promise<void> {
    const createdThing = new this.thingModel(command.thing);
    await createdThing.save();
  }
}
