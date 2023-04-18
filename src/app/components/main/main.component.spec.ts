import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { GetEvents } from '../../shared/models/events.model';
import { EventsinfoService } from '../../shared/services/eventsinfo.service';
import { of } from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let events: GetEvents[];
  let eventsinfoService: EventsinfoService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      providers: [HttpClient, HttpHandler],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    const eventsInfoMock = {
      getEvents: jest.fn(() => of(events)),
    };
    eventsinfoService = new EventsinfoService(eventsInfoMock as any)
    fixture.detectChanges();
    events = [
      {
        id: "1",
        title: "Concierto de rock",
        subtitle: "Los mejores éxitos de la década",
        image: "https://ejemplo.com/imagen1.jpg",
        place: "Estadio Nacional",
        startDate: "2023-05-01T20:00:00",
        endDate: "2023-05-01T22:30:00",
        description: "Ven a disfrutar del mejor concierto de rock del año"
      },
      {
        id: "2",
        title: "Feria de tecnología",
        subtitle: "Las últimas tendencias en gadgets",
        image: "https://ejemplo.com/imagen2.jpg",
        place: "Centro de Convenciones",
        startDate: "2023-06-15T10:00:00",
        endDate: "2023-06-18T20:00:00",
        description: "Ven a conocer las últimas novedades en tecnología"
      },
      {
        id: "3",
        title: "Taller de cocina",
        subtitle: "Aprende a cocinar platos exóticos",
        image: "https://ejemplo.com/imagen3.jpg",
        place: "Escuela de cocina",
        startDate: "2023-07-10T14:00:00",
        endDate: "2023-07-10T18:00:00",
        description: "Aprende técnicas de cocina de la mano de expertos"
      }
    ];
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logicMain', () => {
    jest.spyOn(eventsinfoService, 'getEvents').mockReturnValue(of(events))
    const sort = jest.spyOn(component.cards, 'sort');
    component.logicMain(events);
    expect(component.cards).toEqual(events);
  });

});
