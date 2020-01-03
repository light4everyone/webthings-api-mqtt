import { PropertyValueDto } from '../dto/property-value.dto';

export class PropertyValueUpdatedEvent {
  constructor(
    public readonly thingName: string,
    public readonly propertyValue: PropertyValueDto
  ) { }
}
