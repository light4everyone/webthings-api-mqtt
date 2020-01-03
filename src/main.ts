import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WsAdapter } from './ws-adapter';
import { CustomServerMqtt } from './custom-mqtt-server';
import { env } from './environments';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.connectMicroservice({
    strategy: new CustomServerMqtt({
      url: env.mosquitto.mosquittoUrl
    })
  });

  app.useWebSocketAdapter(new WsAdapter(app));

  await app.startAllMicroservicesAsync();
  await app.listen(8888, '0.0.0.0');
}

bootstrap();
