import { TestBed } from '@angular/core/testing';

import { EventsinfoService } from './eventsinfo.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { EventSessions } from '../models/events-info.model';

describe('EventsinfoService', () => {
  let service: EventsinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ HttpClient, HttpHandler],
    });
    service = TestBed.inject(EventsinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getEventsId', () => {
    service.getEventsId('68')
  });
  it('getError', () => {
    let error: any;
    let eventsessions: Record<string, EventSessions | null> = {};
    service.getError(error, eventsessions, '0')
  });
  it('getEventlogic', () => {
    let res: Object = {
      "event": {
          "id": "68",
          "title": "JOAN MANUEL SERRAT",
          "subtitle": "Antología desordenada",
          "image": "/assets/img/sample-image.jpg"
      },
      "sessions": [
          {
              "date": "1444255200000",
              "availability": "2"
          },
          {
              "date": "1443650400000",
              "availability": "4"
          },
          {
              "date": "1445551200000",
              "availability": "1"
          },
          {
              "date": "1444860000000",
              "availability": "8"
          }
      ]
  };
    let eventsessions: Record<string, EventSessions | null> = {};
    service.getEventlogic(eventsessions, '68', res)
  });

});
