import { RegisterThingHandler } from './register-thing.handler';
import { UpdatePropertyValueHandler } from './update-property-value.handler';
import { NotifyClientsAboutNewPropertyValueHandler } from './notify-clients-about-new-property-value.handler';

export const CommandHandlers = [
  RegisterThingHandler,
  UpdatePropertyValueHandler,
  NotifyClientsAboutNewPropertyValueHandler
];
