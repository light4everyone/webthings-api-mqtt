import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WsAdapter } from './ws-adapter';
import { Transport } from '@nestjs/common/enums/transport.enum';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      host: 'localhost',
      port: 1883,
    },
  });

  app.useWebSocketAdapter(new WsAdapter(app));

  await app.startAllMicroservicesAsync();
  await app.listen(8888, '0.0.0.0');
}

bootstrap();
