import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetValuePropertyQuery } from '../get-value-property.query';
import { PropertyValueDto } from '../../dto/property-value.dto';
import { Inject } from '@nestjs/common';
import { thingModelProvider } from '../../web-thing.constants';
import { Model } from 'mongoose';
import { Thing } from '../../models';
import { BusinessLogicException } from '../../../exceptions';

@QueryHandler(GetValuePropertyQuery)
export class GetValuePropertyHandler implements IQueryHandler<GetValuePropertyQuery> {
  constructor(
    @Inject(thingModelProvider) private readonly thingModel: Model<Thing>
  ) { }

  async execute(query: GetValuePropertyQuery): Promise<PropertyValueDto> {
    const thing = await this.thingModel.findOne({ name: query.thingName }).exec();

    if (thing == null) {
      throw new BusinessLogicException(`Thing not found: ${query.thingName}`);
    }

    const propertyValue = thing.values.find(v => v.name === query.propertyName);

    if (propertyValue == null) {
      throw new BusinessLogicException(`${query.propertyName} Property not found in the ${query.thingName} Thing`);
    }

    return {
      [query.propertyName]: propertyValue.value
    };
  }
}
