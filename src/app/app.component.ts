import { Component } from '@angular/core';
import { EventsinfoService } from './shared/services/eventsinfo.service';
import { GetEvents } from './shared/models/events.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prueba-onebox';
  cards: GetEvents[];
  constructor(private eventsinfo: EventsinfoService){
    this.cards = [];
  }
  ngOnInit(): void {
    this.eventsinfo.getEvents().subscribe({
      next: (res: GetEvents[]) => {
        this.cards = res;
        this.cards.sort((a, b) => {
          const fechaA = new Date(+(a.endDate)).getTime();
          const fechaB = new Date(+(b.endDate)).getTime();
          return fechaA - fechaB;
        });
        this.cards.forEach((item) =>{
          let numfecha: number = +item.startDate;
          let fecha = new Date(numfecha);
          let dia = fecha.getDate();
          let mes = fecha.getMonth() + 1;
          let anio = fecha.getFullYear();
          item.startDate = `${dia}/${mes}/${anio}`;

          numfecha = +item.endDate;
          fecha = new Date(numfecha);
          dia = fecha.getDate();
          mes = fecha.getMonth() + 1;
          anio = fecha.getFullYear();
          item.endDate = `${dia}/${mes}/${anio}`;
        });
      },
      error: () => {
      },
    });
  }
}
