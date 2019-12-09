import { Property } from 'src/web-thing/models';

export class RegisterThingCommand {
  constructor(
    public readonly name: string,
    public readonly title: string,
    public readonly description: string,
    public readonly type: string[],
    public readonly properties: { [name: string]: Property }
  ) {}
}
