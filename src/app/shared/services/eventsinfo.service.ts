import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GetEvents } from '../models/events.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsinfoService {

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

}
