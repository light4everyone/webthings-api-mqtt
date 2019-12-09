import { LinkDto } from './link.dto';

export class PropertyDescriptionDto {
  readonly title: string;
  readonly description: string;
  readonly type: string;
  readonly links: LinkDto[];
  readonly '@type': string;
}
