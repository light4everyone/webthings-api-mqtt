import { ICommandHandler, CommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdatePropertyValueCommand } from '../update-property-value.command';
import { Inject } from '@nestjs/common';
import { thingModelProvider } from '../../web-thing.constants';
import { Model } from 'mongoose';
import { Thing } from '../../models';
import { PropertyValueDto } from '../../dto/property-value.dto';
import { BusinessLogicException } from '../../../exceptions';
import { PropertyValueUpdatedEvent } from '../../events';

@CommandHandler(UpdatePropertyValueCommand)
export class UpdatePropertyValueHandler implements ICommandHandler<UpdatePropertyValueCommand> {
  constructor(
    @Inject(thingModelProvider) private readonly thingModel: Model<Thing>,
    private readonly eventBus: EventBus
  ) { }

  async execute(command: UpdatePropertyValueCommand): Promise<PropertyValueDto> {
    const thing = await this.thingModel.findOne({ name: command.thingName }).exec();

    if (thing == null) {
      throw new BusinessLogicException(`Thing not found: ${command.thingName}`);
    }

    const properties = Object.keys(command.propertyValue);

    if (properties.length === 0) {
      throw new BusinessLogicException(`Property not found in the ${command.thingName} Thing`);
    }

    const propertyName = properties[0];
    const propertyValue = thing.values.find(v => v.name === propertyName);

    if (propertyValue == null) {
      throw new BusinessLogicException(`${propertyName} Property not found in the ${command.thingName} Thing`);
    }

    await this.thingModel.updateOne({
      '_id': thing._id, 'values.name': propertyName
    }, {
      $set: {
        'values.$.value': command.propertyValue[propertyName]
      }
    });

    this.eventBus.publish(new PropertyValueUpdatedEvent(command.thingName, command.propertyValue));

    return {
      [propertyName]: command.propertyValue[propertyName]
    };
  }
}
