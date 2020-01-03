import { PropertyValueDto } from '../dto/property-value.dto';

export class NotifyClientsAboutNewPropertyValueCommand {
  constructor(
    public readonly thingName: string,
    public readonly propertyValue: PropertyValueDto
  ) {}
}
