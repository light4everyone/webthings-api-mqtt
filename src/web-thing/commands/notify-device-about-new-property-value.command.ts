import { PropertyValueDto } from '../dto/property-value.dto';

export class NotifyDeviceAboutNewPropertyValueCommand {
  constructor(
    public readonly thingName: string,
    public readonly propertyValue: PropertyValueDto
  ) {}
}
