import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: any) {
    // tslint:disable-next-line: no-console
    console.log(req.originalUrl as string);
    next();
  }
}
