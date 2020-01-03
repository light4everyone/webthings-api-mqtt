import { Controller } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventPattern, Payload, Ctx, MqttContext } from '@nestjs/microservices';
import { PropertyValueDto } from './dto/property-value.dto';
import mqttMatch from '../common/mqtt-match';
import { NewPropertyValueReceivedEvent } from './events';

@Controller()
export class WebThingMqttController {
  constructor(
    private readonly eventBus: EventBus
  ) { }

  @EventPattern('things/+/setProperty')
  onSetProperty(@Payload() propertyValue: PropertyValueDto, @Ctx() context: MqttContext) {
    const [ thingName ] = mqttMatch(context.getTopic(), 'things/+/setProperty');

    this.eventBus.publish(new NewPropertyValueReceivedEvent(thingName, propertyValue));
  }
}
