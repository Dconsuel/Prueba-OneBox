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
    // Llamada al servicio getEvents()
    this.eventsinfo.getEvents().subscribe({
      next: (res: GetEvents[]) => {
        // Lógica principal del componente
        this.logicMain(res);
      },
      error: () => {
        // Manejo de errores (vacío)
      },
    });
  }

  // Función que aplica la lógica principal del componente
  logicMain(res: GetEvents[]){
    // Se asigna el resultado de la llamada a la propiedad cards
    this.cards = res;
    // Se ordena la lista de eventos por fecha de finalización
    this.cards.sort((a, b) => {
      const fechaA = new Date(+(a.endDate)).getTime();
      const fechaB = new Date(+(b.endDate)).getTime();
      return fechaA - fechaB;
    });
    // Se formatea la fecha de inicio y fin de cada evento en la lista
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

