import { ThingRegisterDto } from '../dto/thing-register.dto';

export class RegisterThingCommand {
  constructor(
    public readonly thing: ThingRegisterDto
  ) {}
}
