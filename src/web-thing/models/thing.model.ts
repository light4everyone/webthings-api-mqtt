import { Property } from './property.model';

export class Thing {
  type: string[];
  title: string;
  name: string;
  description?: string;
  properties: Property[];
  value: object;
}
