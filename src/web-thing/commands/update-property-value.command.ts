import { PropertyValueDto } from '../dto/property-value.dto';

export class UpdatePropertyValueCommand {
  constructor(
    public readonly thingName: string,
    public readonly propertyValue: PropertyValueDto
  ) {}
}
