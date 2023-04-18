import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartComponent } from './shopping-cart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let eventsessionss: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ShoppingCartComponent ],
      providers: [ HttpClient, HttpHandler],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    eventsessionss = '[{"event":{"id":"68","title":"JOAN MANUEL SERRAT","subtitle":"Antología desordenada","image":"/assets/img/sample-image.jpg"},"sessions":[{"date":"8/10/2015","availability":1,"numberticket":1},{"date":"15/10/2015","availability":7,"numberticket":1},{"date":"23/10/2015","availability":0,"numberticket":1}]},{"event":{"id":"184","title":"PABLO ALBORÁN","subtitle":"Terral (2014)","image":"/assets/img/sample-image.jpg"},"sessions":[{"date":"30/9/2015","availability":4,"numberticket":2},{"date":"1/11/2015","availability":7,"numberticket":1}]}]';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.getApiResponse).toBeTruthy();
  });

  it('getResultObjectlocal', () => {
    component.getResultObjectlocal(eventsessionss);
  });

  it('getResultObjectlocal else', () => {
    component.cardId = '68';
    component.getResultObjectlocal(eventsessionss);
  });

  it('getResultObjectlocal else', () => {
    component.cardId = '184';
    component.eventsinfo.StateEventSessions = [
      {
          "1": {
              "event": {
                  "id": "1",
                  "title": "JOAN MANUEL SERRAT",
                  "subtitle": "Antología desordenada",
                  "image": "/assets/img/sample-image.jpg"
              },
              "sessions": [
                  {
                      "date": "1/10/2015",
                      "availability": 4,
                      "numberticket": 0
                  },
                  {
                      "date": "8/10/2015",
                      "availability": 2,
                      "numberticket": 0
                  },
                  {
                      "date": "15/10/2015",
                      "availability": 8,
                      "numberticket": 0
                  },
                  {
                      "date": "23/10/2015",
                      "availability": 1,
                      "numberticket": 0
                  }
              ]
          }
      },
      {
          "184": {
              "event": {
                  "id": "184",
                  "title": "PABLO ALBORÁN",
                  "subtitle": "Terral (2014)",
                  "image": "/assets/img/sample-image.jpg"
              },
              "sessions": [
                  {
                      "date": "23/9/2015",
                      "availability": 3,
                      "numberticket": 0
                  },
                  {
                      "date": "30/9/2015",
                      "availability": 6,
                      "numberticket": 0
                  },
                  {
                      "date": "10/10/2015",
                      "availability": 5,
                      "numberticket": 0
                  },
                  {
                      "date": "1/11/2015",
                      "availability": 8,
                      "numberticket": 0
                  },
                  {
                      "date": "11/11/2015",
                      "availability": 10,
                      "numberticket": 0
                  }
              ]
          }
      }
  ]
    component.getApiResponse();
  });

});
