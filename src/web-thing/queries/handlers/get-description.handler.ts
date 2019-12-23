import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDescriptionQuery } from '../get-description.query';
import { ThingService } from '../../services';
import { ThingDescriptionDto } from '../../dto';
import { WebThingConfig } from '../../web-thing.config';
import { Inject } from '@nestjs/common';

@QueryHandler(GetDescriptionQuery)
export class GetDescriptionHandler implements IQueryHandler<GetDescriptionQuery> {
  constructor(
    private readonly thingService: ThingService,
    @Inject('WebThingConfig') private readonly config: WebThingConfig
  ) { }

  async execute(query: GetDescriptionQuery): Promise<ThingDescriptionDto> {
    const thing = this.thingService.getThing(query.thingName);

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
              href: `/api/things/${query.thingName}/properties/${property.alias}`
            }
          ]
        };
        acc[property.alias] = propertyDto;
        return acc;
      }, {}),
      '@context': 'https://iot.mozilla.org/schemas/',
      '@type': thing.type,
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
