import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ThingDescriptionDto, ThingRegisterDto } from './dto';
import { GetDescriptionQuery } from './queries';
import { RegisterThingCommand } from './commands';

@Controller('api/things')
export class WebThingController {

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBug: CommandBus
  ) { }

  @Get(':thingName')
  getThingDescription(@Param('thingName') thingName: string): Promise<ThingDescriptionDto> {
    return this.queryBus.execute(new GetDescriptionQuery(thingName));
  }

  @Post()
  async registerThing(@Body() thing: ThingRegisterDto): Promise<ThingDescriptionDto> {
    await this.commandBug.execute(new RegisterThingCommand(thing));
    return await this.queryBus.execute(new GetDescriptionQuery(thing.name));
  }
}
