import { Injectable } from '@nestjs/common';
import { Thing, Property } from '../models';
import { BusinessLogicException } from '../../exceptions';

@Injectable()
export class ThingService {
  private things: Thing[] = [];

  constructor() {
    // this.things.push(
    //   {
    //     type: ['OnOffSwitch'],
    //     title: 'title',
    //     name: 'switch',
    //     description: 'Description',
    //     properties: [{
    //       'title': 'On/Off',
    //       '@type': 'OnOffProperty',
    //       'type': 'boolean',
    //       'description': 'Property Description',
    //       'name': 'on'
    //     } as Property],
    //     value: {
    //       on: true
    //     }
    //   } as Thing);
  }

  registerThing(thing: Thing): void {
    if (thing == null) {
      return;
    }

    this.things.push(thing);
  }

  getThing(thingName: string): Thing {
    const thing = this.things.find(f => f.alias === thingName);

    if (thing == null) {
      throw new BusinessLogicException(`Thing not found: ${thingName}`);
    }

    return this.things.find(t => t.alias === thingName);
  }

  getValue(thingName: string): object {
    const thing = this.things.find(f => f.alias === thingName);

    if (thing == null) {
      throw new BusinessLogicException(`Thing not found: ${thingName}`);
    }

    const value = thing.value;

    return value;
  }

  setValue(thingName: string, newValue: object): void {
    const thing = this.things.find(f => f.alias === thingName);

    if (thing == null || newValue == null) {
      throw new BusinessLogicException(`Thing not found: ${thingName}`);
    }

    thing.value = { ...newValue };
  }

  getPropertyValue(thingName: string, propertyName: string): object {
    const thing = this.things.find(f => f.alias === thingName);

    if (thing == null) {
      throw new BusinessLogicException(`Thing not found: ${thingName}`);
    }

    const value = thing.value;

    if (!value.hasOwnProperty(propertyName)) {
      throw new BusinessLogicException(`Property not found: ${propertyName}`);
    }

    const property = { [propertyName]: value[propertyName] };

    return property;
  }

  setPropertyValue(thingName: string, propertyName: string, propertyValue: object): void {
    const thing = this.things.find(f => f.alias === thingName);

    if (thing == null) {
      throw new BusinessLogicException(`Thing not found: ${thingName}`);
    }

    const value = thing.value;

    if (!value.hasOwnProperty(propertyName)) {
      throw new BusinessLogicException(`Property not found: ${propertyName}`);
    }

    const property = { [propertyName]: propertyValue };

    thing.value = { ...value, ...property };
  }
}
