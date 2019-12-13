import { PropertyRegisterDto } from './property-register.dto';

export class ThingRegisterDto {
  type: string[];
  title: string;
  name: string;
  description?: string;
  properties: PropertyRegisterDto[];
}
