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

  // Array para almacenar los eventos recuperados del servidor junto con sus sesiones correspondientes
  public StateEventSessions: Record<string, EventSessions | null>[] = [];

  constructor(private http: HttpClient){
    // Constructor de la clase, recibe una instancia de HttpClient como parámetro
  }

  // Método para recuperar todos los eventos
  public getEvents(): Observable<GetEvents[]> {
    const url: string = environment.baseUrl + environment.endpoints.events.url;
    // Se construye la URL para hacer la solicitud al servidor
    return this.http.get(url).pipe(
      map((res: Object) => {
        return res as GetEvents[];
        // Se mapea la respuesta del servidor para que tenga la forma deseada (GetEvents[])
      })
    );
  }

  // Método para recuperar un evento específico por su ID
  public getEventsId(id: string): Observable<Record<string, EventSessions | null>> {
    const url: string = environment.baseUrl + environment.endpoints.eventInfo.url.replace('#', id);
    // Se construye la URL para hacer la solicitud al servidor
    let eventsessions: Record<string, EventSessions | null> = {};
    // Se crea un objeto para almacenar las sesiones del evento
    return this.http.get(url).pipe(
      map((res: Object) => {
        return this.getEventlogic(eventsessions, id, res);
        // Se llama al método getEventlogic para procesar la respuesta del servidor
      }),
      catchError((error) => {
        return this.getError(error, eventsessions, id);
        // En caso de error, se llama al método getError para manejar la excepción
      })
    );
  }

  // Método para manejar errores en la recuperación de un evento
  getError(error: any, eventsessions: Record<string, EventSessions | null>, id: string){
    eventsessions[id] = null;
    // Se establece el valor null para las sesiones del evento
    this.StateEventSessions?.push(eventsessions);
    // Se agrega el objeto eventsessions al array StateEventSessions
    console.error('Error fetching event sessions:', error);
    // Se muestra un mensaje de error en la consola del navegador
    return throwError(() => error);
    // Se lanza una excepción con el error recibido
  }

  // Método para procesar la respuesta del servidor al recuperar un evento
  getEventlogic(eventsessions: Record<string, EventSessions | null>,id: string, res: Object){
    eventsessions[id] = res as EventSessions;
    // Se agrega la respuesta del servidor al objeto eventsessions
    eventsessions[id]?.sessions?.sort((a, b) => {
      const fechaA = new Date(+(a.date)).getTime();
      const fechaB = new Date(+(b.date)).getTime();
      return fechaA - fechaB;
      // Se ordenan las sesiones del evento por fecha
    });
    eventsessions[id]?.sessions?.forEach((item) =>{
      let numfecha: number = +item.date;
      let fecha = new Date(numfecha);
      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      let anio = fecha.getFullYear();
      item.date = `${dia}/${mes}/${anio}`;
      item.numberticket = 0;
      // Se formatea la fecha de cada sesión y se establece el número de tickets en cero
    });
    this.StateEventSessions?.push(eventsessions);
    // Se agrega el objeto eventsessions al array StateEvent
    return eventsessions;
    
  }

}
