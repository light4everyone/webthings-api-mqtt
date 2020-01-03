import { RegisterThingHandler } from './register-thing.handler';
import { UpdatePropertyValueHandler } from './update-property-value.handler';
import { NotifyClientsAboutNewPropertyValueHandler } from './notify-clients-about-new-property-value.handler';
import { NotifyDeviceAboutNewPropertyValueHandler } from './notify-device-about-new-property-value.handler';

export const CommandHandlers = [
  RegisterThingHandler,
  UpdatePropertyValueHandler,
  NotifyClientsAboutNewPropertyValueHandler,
  NotifyDeviceAboutNewPropertyValueHandler
];
