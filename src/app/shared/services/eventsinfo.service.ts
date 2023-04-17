import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { GetEvents } from '../models/events.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventSessions } from '../models/events-info.model';

@Injectable({
  providedIn: 'root'
})
export class EventsinfoService {

  public StateEventSessions: Record<string, EventSessions | null>[] = [];

  constructor(private http: HttpClient){

  }

  public getEvents(): Observable<GetEvents[]> {
    const url: string = environment.baseUrl + environment.endpoints.events.url;
    return this.http.get(url).pipe(
      map((res: Object) => {
        return res as GetEvents[];
      })
    );
  }

  public getEventsId(id: string): Observable<Record<string, EventSessions | null>> {
    const url: string = environment.baseUrl + environment.endpoints.eventInfo.url.replace('#', id);
    let eventsessions: Record<string, EventSessions | null> = {};
    return this.http.get(url).pipe(
      map((res: Object) => {
        eventsessions[id] = res as EventSessions;
        eventsessions[id]?.sessions?.sort((a, b) => {
          const fechaA = new Date(+(a.date)).getTime();
          const fechaB = new Date(+(b.date)).getTime();
          return fechaA - fechaB;
        });
        eventsessions[id]?.sessions?.forEach((item) =>{
          let numfecha: number = +item.date;
          let fecha = new Date(numfecha);
          let dia = fecha.getDate();
          let mes = fecha.getMonth() + 1;
          let anio = fecha.getFullYear();
          item.date = `${dia}/${mes}/${anio}`;
          item.numberticket = 0;
        });
        this.StateEventSessions?.push(eventsessions);
        return eventsessions;
      }),
      catchError((error) => {
        eventsessions[id] = null;
        this.StateEventSessions?.push(eventsessions);
        console.error('Error fetching event sessions:', error);
        return throwError(() => error);
      })
    );
  }

}
