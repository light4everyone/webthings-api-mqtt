import { Injectable } from '@nestjs/common';
import { Thing, Property } from '../models';
import { BusinessLogicException } from '../../exceptions';

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
        properties: [{
          'title': 'On/Off',
          '@type': 'OnOffProperty',
          'type': 'boolean',
          'description': 'Property Description'
        } as Property]
      } as Thing);
  }

  registerThing(thing: Thing): void {
    if (thing == null) {
      return;
    }

    this.things.push(thing);
  }

  getThing(thingName: string): Thing {
    const thing = this.things.find(f => f.name === thingName);

    if (thing == null) {
      throw new BusinessLogicException('Thing not found');
    }

    return this.things.find(t => t.name === thingName);
  }

  getValue(thingName: string): object {
    const thing = this.things.find(f => f.name === thingName);

    if (thing == null) {
      throw new BusinessLogicException('Thing not found');
    }

    const value = thing.value;

    return value;
  }

  setValue(thingName: string, newValue: object): void {
    const thing = this.things.find(f => f.name === thingName);

    if (thing == null || newValue == null) {
      throw new BusinessLogicException('Thing not found');
    }

    thing.value = { ...newValue };
  }
}
