import { Injectable } from '@nestjs/common';
import { Thing, Property } from '../models';

@Injectable()
export class ThingService {
  private things: Thing[] = [];

  constructor() {
    this.things.push(
      {
        type: ['OnOffSwitch'],
        title: 'title',
        name: 'switch',
        description: 'Description',
        properties: {
          on: {
            'title': 'On/Off',
            '@type': 'OnOffProperty',
            'type': 'boolean',
            'description': 'Property Description'
          }
        }
      } as Thing);
  }

  registerThing(thing: Thing): void {
    this.things.push(thing);
  }

  getThing(thingName: string): Thing {
    return this.things.find(t => t.name === thingName);
  }
}
