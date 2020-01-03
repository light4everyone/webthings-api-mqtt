import { INestApplicationContext, Logger } from '@nestjs/common';
import { AbstractWsAdapter } from '@nestjs/websockets';
import {
  CLOSE_EVENT,
  CONNECTION_EVENT,
  ERROR_EVENT,
} from '@nestjs/websockets/constants';
import { MessageMappingProperties } from '@nestjs/websockets/gateway-metadata-explorer';
import { EMPTY as empty, fromEvent, Observable } from 'rxjs';
import { filter, first, mergeMap, share, takeUntil } from 'rxjs/operators';
import * as WebSocket from 'ws';
import * as UrlMatcher from 'url-pattern';

enum READY_STATE {
  CONNECTING_STATE = 0,
  OPEN_STATE = 1,
  CLOSING_STATE = 2,
  CLOSED_STATE = 3,
}

export class WsAdapter extends AbstractWsAdapter {
  protected readonly logger = new Logger(WsAdapter.name);

  constructor(appOrHttpServer?: INestApplicationContext | any) {
    super(appOrHttpServer);
  }

  create(
    port: number,
    options?: WebSocket.ServerOptions,
  ): WebSocket.Server {
    const { ...wsOptions } = options;
    return this.overrideShouldHandleMethod(this.bindErrorHandler(
      new WebSocket.Server({
        server: this.httpServer,
        ...wsOptions,
      })),
    );
  }

  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    transform: (data: any) => Observable<any>,
  ) {
    const close$ = fromEvent(client, CLOSE_EVENT).pipe(share(), first());
    const source$ = fromEvent(client, 'message').pipe(
      mergeMap(data =>
        this.bindMessageHandler(data, handlers, transform).pipe(
          filter(result => result),
        ),
      ),
      takeUntil(close$),
    );
    const onMessage = (response: any) => {
      if (client.readyState !== READY_STATE.OPEN_STATE) {
        return;
      }
      client.send(JSON.stringify(response));
    };
    source$.subscribe(onMessage);
  }

  bindMessageHandler(
    buffer: any,
    handlers: MessageMappingProperties[],
    transform: (data: any) => Observable<any>,
  ): Observable<any> {
    try {
      const message = JSON.parse(buffer.data);
      const messageHandler = handlers.find(
        handler => handler.message === message.messageType,
      );
      const { callback } = messageHandler;
      return transform(callback(message.data));
    } catch {
      return empty;
    }
  }

  overrideShouldHandleMethod(server: WebSocket.Server): WebSocket.Server {
    server.shouldHandle = (req) => {
      const index = req.url.indexOf('?');
      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

      const pattern = new UrlMatcher(server.options.path);
      const result = pattern.match(pathname);

      return result != null;
    };

    return server;
  }

  bindErrorHandler(server: WebSocket.Server): WebSocket.Server {
    server.on(CONNECTION_EVENT, ws => {
      ws.on(ERROR_EVENT, (err: any) => this.logger.error(err));
    });
    server.on(ERROR_EVENT, (err: any) => this.logger.error(err));

    return server;
  }

  bindClientDisconnect(client: WebSocket, callback: (this: WebSocket, code: number, reason: string) => void) {
    client.on(CLOSE_EVENT, callback);
  }
}
