import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, mergeMap } from 'rxjs/operators';
import { UpdatePropertyValueCommand, NotifyClientsAboutNewPropertyValueCommand, NotifyDeviceAboutNewPropertyValueCommand } from './commands';
import { NewPropertyValueReceivedEvent, PropertyValueUpdatedEvent } from './events';

@Injectable()
export class WebThingSagas {
  @Saga()
  newPropertyValueReceived = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NewPropertyValueReceivedEvent),
      map(event => new UpdatePropertyValueCommand(event.thingName, event.propertyValue))
    );
  }

  @Saga()
  propertyValueUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PropertyValueUpdatedEvent),
      mergeMap((event) => of(
        new NotifyDeviceAboutNewPropertyValueCommand(event.thingName, event.propertyValue),
        new NotifyClientsAboutNewPropertyValueCommand(event.thingName, event.propertyValue)
      ))
    );
  }
}
