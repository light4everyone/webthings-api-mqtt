import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dnssd from 'dnssd';

function startMdns() {
  const mdns = new dnssd.Advertisement(
    new dnssd.ServiceType('_webthing._tcp'),
    8888,
    {
      name: 'mqtt-cloud',
      txt: {
        path: '/',
      },
    });
  mdns.on('error', e => {
    // tslint:disable-next-line: no-console
    console.debug(e);
    setTimeout(() => {
      this.mdns.start();
    }, 10000);
  });

  mdns.start();
}

async function bootstrap() {
  startMdns();

  const app = await NestFactory.create(AppModule);
  await app.listen(8888);
}
bootstrap();
