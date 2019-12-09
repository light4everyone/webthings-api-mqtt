import { PropertyDescriptionDto } from './property-description.dto';
import { LinkDto } from './link.dto';

export class ThingDescriptionDto {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly properties: { [name: string]: PropertyDescriptionDto };
  readonly links: LinkDto[];
  readonly '@type': string[];
  readonly '@context': string;
}
