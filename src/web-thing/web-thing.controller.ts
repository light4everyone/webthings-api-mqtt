import { Controller, Get, Param, Body, Post, UseInterceptors, CacheInterceptor, Put } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ThingDescriptionDto, ThingRegisterDto } from './dto';
import { GetDescriptionQuery, GetValuePropertyQuery } from './queries';
import { RegisterThingCommand, UpdatePropertyValueCommand } from './commands';
import { PropertyValueDto } from './dto/property-value.dto';

@Controller('api/things')
export class WebThingController {

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) { }

  @Get(':thingName')
  @UseInterceptors(CacheInterceptor)
  getThingDescription(@Param('thingName') thingName: string): Promise<ThingDescriptionDto> {
    return this.queryBus.execute(new GetDescriptionQuery(thingName));
  }

  @Get(':thingName/properties/:propertyName')
  async getProperty(
    @Param('thingName') thingName: string,
    @Param('propertyName') propertyName: string
  ): Promise<PropertyValueDto> {
    return this.queryBus.execute(new GetValuePropertyQuery(
      thingName,
      propertyName
    ));
  }

  @Put(':thingName/properties/:propertyName')
  async updateProperty(
    @Param('thingName') thingName: string,
    @Body() propertyValue: PropertyValueDto
  ): Promise<PropertyValueDto> {
    return this.commandBus.execute(new UpdatePropertyValueCommand(
      thingName, propertyValue
    ));
  }

  @Post()
  async registerThing(@Body() thing: ThingRegisterDto): Promise<ThingDescriptionDto> {
    await this.commandBus.execute(new RegisterThingCommand(thing));
    return await this.queryBus.execute(new GetDescriptionQuery(thing.name));
  }
}
