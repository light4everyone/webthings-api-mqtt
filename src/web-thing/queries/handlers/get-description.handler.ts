import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDescriptionQuery } from '../get-description.query';
import { ThingDescriptionDto } from '../../dto';
import { Inject } from '@nestjs/common';
import { thingModelProvider } from '../../web-thing.constants';
import { Model } from 'mongoose';
import { Thing } from '../../../web-thing/models';
import { BusinessLogicException } from '../../../exceptions';
import { env } from '../../../environments';

@QueryHandler(GetDescriptionQuery)
export class GetDescriptionHandler implements IQueryHandler<GetDescriptionQuery> {
  constructor(
    @Inject(thingModelProvider) private readonly thingModel: Model<Thing>,
  ) { }

  async execute(query: GetDescriptionQuery): Promise<ThingDescriptionDto> {
    const thing = await this.thingModel.findOne({ name: query.thingName }).exec();

    if (thing == null) {
      throw new BusinessLogicException(`Thing not found: ${query.thingName}`);
    }

    const thingDescription: ThingDescriptionDto = {
      'id': `http://${env.host}:${env.port}/api/things/${query.thingName}`,
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
        },
        {
          rel: 'alternate',
          href: `ws://${env.host}:${env.port}/things/${query.thingName}`
        },
      ]
    };

    return thingDescription;
  }
}
