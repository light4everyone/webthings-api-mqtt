import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDescriptionQuery } from '../get-description.query';
import { ThingDescriptionDto } from '../../dto';
import { WebThingConfig } from '../../web-thing.config';
import { Inject } from '@nestjs/common';
import { thingModelProvider } from '../../constants/model-provider.constants';
import { Model } from 'mongoose';
import { Thing } from 'src/web-thing/models';
import { BusinessLogicException } from '../../../exceptions';

@QueryHandler(GetDescriptionQuery)
export class GetDescriptionHandler implements IQueryHandler<GetDescriptionQuery> {
  constructor(
    @Inject('WebThingConfig') private readonly config: WebThingConfig,
    @Inject(thingModelProvider) private readonly thingModel: Model<Thing>,
  ) { }

  async execute(query: GetDescriptionQuery): Promise<ThingDescriptionDto> {
    const thing = await this.thingModel.findOne({ name: query.thingName }).exec();

    if (thing == null) {
      throw new BusinessLogicException(`Thing not found: ${query.thingName}`);
    }

    const thingDescription: ThingDescriptionDto = {
      'id': `https://mywebthingserver.com/things/${query.thingName}`,
      'title': thing.title,
      'description': thing.description,
      'properties': thing.properties.reduce((acc, property) => {
        const propertyDto = {
          'title': property.title,
          'type': property.type,
          '@type': property['@type'],
          'description': property.description,
          'links': [
            {
              href: `/api/things/${query.thingName}/properties/${property.name}`
            }
          ]
        };
        acc[property.name] = propertyDto;
        return acc;
      }, {}),
      '@context': 'https://iot.mozilla.org/schemas/',
      '@type': thing.types,
      'links': [
        {
          rel: 'properties',
          href: `/api/things/${query.thingName}/properties`
        }
      ]
    };

    return thingDescription;
  }
}
