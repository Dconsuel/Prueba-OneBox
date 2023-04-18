import { Component } from '@angular/core';
import { GetEvents } from '../../shared/models/events.model';
import { EventsinfoService } from '../../shared/services/eventsinfo.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  cards: GetEvents[];
  constructor(public eventsinfo: EventsinfoService){
    this.cards = [];
  }
  ngOnInit(): void {
    this.eventsinfo.getEvents().subscribe({
      next: (res: GetEvents[]) => {
        this.logicMain(res);
      },
      error: () => {
      },
    });
  }

  logicMain(res: GetEvents[]){
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
  }
}
