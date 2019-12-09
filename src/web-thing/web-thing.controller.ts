import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ThingDescriptionDto } from './dto';
import { GetDescriptionQuery } from './queries';

@Controller('api/things')
export class WebThingController {

  constructor(
    private readonly queryBus: QueryBus
  ) { }

  @Get(':thingName')
  getThingDescription(@Param('thingName') thingName: string): Promise<ThingDescriptionDto> {
    return this.queryBus.execute(new GetDescriptionQuery(thingName));
  }
}
