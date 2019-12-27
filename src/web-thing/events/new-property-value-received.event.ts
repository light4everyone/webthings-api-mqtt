import { PropertyValueDto } from '../dto/property-value.dto';

export class NewPropertyValueReceivedEvent {
  constructor(
    public readonly thingName: string,
    public readonly propertyValue: PropertyValueDto
  ) { }
}
