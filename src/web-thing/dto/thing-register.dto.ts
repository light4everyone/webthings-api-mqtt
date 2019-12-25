import { PropertyRegisterDto } from './property-register.dto';

export class ThingRegisterDto {
  types: string[];
  title: string;
  name: string;
  description?: string;
  properties: PropertyRegisterDto[];
}
