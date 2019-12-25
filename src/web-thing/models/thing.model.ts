import { Property } from './property.model';
import { ValueThing } from './value-thing.model';
import { Document } from 'mongoose';

export interface Thing extends Document {
  types: string[];
  title: string;
  name: string;
  description?: string;
  values: ValueThing[];
  properties: Property[];
}
