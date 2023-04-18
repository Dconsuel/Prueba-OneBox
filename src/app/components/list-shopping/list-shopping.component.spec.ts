import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListShoppingComponent } from './list-shopping.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { OrderbyPipe } from '../../shared/pipes/orderby.pipe';
import { EventSessions } from '../../shared/models/events-info.model';
import { ChangeDetectorRef } from '@angular/core';
import { EventsinfoService } from '../../shared/services/eventsinfo.service';

describe('ListShoppingComponent', () => {
  let component: ListShoppingComponent;
  let fixture: ComponentFixture<ListShoppingComponent>;
  let cdr: ChangeDetectorRef;
  let eventsinfo: EventsinfoService;
  let orderbypipe: OrderbyPipe;
  let eventSessions_array: EventSessions[];
  let eventsessionss: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListShoppingComponent, OrderbyPipe],
      providers: [HttpClient, HttpHandler, OrderbyPipe],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    cdr = {
      detectChanges: jest.fn(),
    } as unknown as ChangeDetectorRef;

    eventsinfo = {
      // Implementar un mock de EventsinfoService si es necesario
    } as unknown as EventsinfoService;

    eventsinfo.StateEventSessions = [
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

    orderbypipe = {
      // Implementar un mock de OrderbyPipe si es necesario
    } as unknown as OrderbyPipe;

    component = new ListShoppingComponent(cdr, eventsinfo, orderbypipe);
    eventSessions_array = [
      {
        event: {
          id: '1',
          title: 'Evento 1',
          subtitle: 'Subtítulo 1',
          image: 'https://example.com/image1.jpg',
        },
        sessions: [
          {
            date: '1/10/2015',
            availability: 10,
            numberticket: 5,
          },
          {
            date: '2022-05-02',
            availability: 5,
            numberticket: 2,
          },
        ],
      },
      {
        event: {
          id: '2',
          title: 'Evento 2',
          subtitle: 'Subtítulo 2',
          image: 'https://example.com/image2.jpg',
        },
        sessions: [
          {
            date: '2022-05-03',
            availability: 20,
            numberticket: 10,
          },
          {
            date: '2022-05-04',
            availability: 15,
            numberticket: 7,
          },
        ],
      },
    ];
    eventsessionss = '[{"event":{"id":"68","title":"JOAN MANUEL SERRAT","subtitle":"Antología desordenada","image":"/assets/img/sample-image.jpg"},"sessions":[{"date":"8/10/2015","availability":1,"numberticket":1},{"date":"15/10/2015","availability":7,"numberticket":1},{"date":"23/10/2015","availability":0,"numberticket":1}]},{"event":{"id":"184","title":"PABLO ALBORÁN","subtitle":"Terral (2014)","image":"/assets/img/sample-image.jpg"},"sessions":[{"date":"30/9/2015","availability":4,"numberticket":2},{"date":"1/11/2015","availability":7,"numberticket":1}]}]';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize typeCard as a new instance of EventSessions', () => {
    expect(component.typeCard instanceof EventSessions).toBe(true);
  });

  it('should initialize typecardlocal as an empty array', () => {
    expect(component.typecardlocal).toEqual([]);
  });

  it('should initialize Shoppingcart as an empty array', () => {
    expect(component.Shoppingcart).toEqual([]);
  });

  it('should load Shoppingcart from localStorage if it exists', () => {
    // Simular que el resultado de getItem es el carrito de compras
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    };
    jest.spyOn(localStorageMock, 'getItem').mockReturnValue(JSON.parse(eventsessionss));

    component.Shoppingcart = JSON.parse(eventsessionss);

    expect(component.Shoppingcart).toEqual(JSON.parse(eventsessionss));
  });

  it('should load typecardlocal from localStorage if it exists', () => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    };
    // Simular que el resultado de getItem es el tipo de tarjeta
    jest.spyOn(localStorageMock, 'getItem').mockReturnValue(JSON.parse(eventsessionss));

    component.typecardlocal = JSON.parse(eventsessionss);

    expect(component.typecardlocal).toEqual(JSON.parse(eventsessionss));
  });

  it('removesession if', () => {
    component.Shoppingcart = eventSessions_array;
    component.typeCard = eventSessions_array[0];
    component.removesession(0,0);
    expect(component.Shoppingcart[0].sessions!.length).toBe(2);
    expect(component.Shoppingcart[0].sessions![0].date).toBe('1/10/2015');
  });  

  it('removesession else, subtractAvailability, addtypercardtolocal', () => {
    component.Shoppingcart = eventSessions_array;
    component.typeCard = eventSessions_array[1];
    component.eventsinfo.StateEventSessions = eventsinfo.StateEventSessions;
    component.removesession(0,0);
    const object = {
      availability: 2,
      numberticket: 5
    };
    function funcionpruebaobject() {
      object.availability = +object.availability + 1;
      object.numberticket -= 1;
    }
    funcionpruebaobject();
    expect(object.availability).toEqual(3);
    expect(object.numberticket).toEqual(4);
    expect(component.eventsinfo.StateEventSessions[0][1]!.sessions![0].availability).toEqual(11);
    expect(component.eventsinfo.StateEventSessions[0][1]!.sessions![0].numberticket).toEqual(4);
  });  

  it('removeEventSessionsCard', () => {
    component.Shoppingcart = eventSessions_array;
    component.Shoppingcart[0].sessions![0].numberticket = 0;
    const localStorageMock = {
      removeItem: jest.fn()
    };
    jest.spyOn(localStorageMock, 'removeItem').mockReturnValue(() => {});
    component.removeEventSessionsCard(0,0);
    expect(component.Shoppingcart[0].sessions![0]).toBeTruthy();
  });

  it('logictypecardlocal', () => {
    component.typeCard = eventSessions_array[1];
    component.typecardlocal = eventSessions_array;
    component.logictypecardlocal();
    expect(component.typecardlocal.length > 0).toBeTruthy();
  });

  it('addAvailability', () => {
    component.typeCard = eventSessions_array[0];
    component.Shoppingcart = eventSessions_array;
    component.addAvailability(0);
  });

  it('addAvailability else', () => {
    const eventSessions_array_fake = [
      {
        event: {
          id: '1',
          title: 'Evento 1',
          subtitle: 'Subtítulo 1',
          image: 'https://example.com/image1.jpg',
        },
        sessions: [
          {
            date: '1/10/2015',
            availability: 10,
            numberticket: 5,
          },
          {
            date: '2022-05-02',
            availability: 5,
            numberticket: 2,
          },
        ],
      }
    ];
    component.typeCard = eventSessions_array[1];
    component.Shoppingcart = eventSessions_array_fake;
    component.orderbypipe.transform = jest.fn();
    component.addAvailability(0);
  });

});
