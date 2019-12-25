import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { WebThingModule } from './web-thing/web-thing.module';
import { LoggerMiddleware } from './logger.middleware';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    WebThingModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
