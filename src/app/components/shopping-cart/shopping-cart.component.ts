import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventSessions } from '../../shared/models/events-info.model';
import { EventsinfoService } from '../../shared/services/eventsinfo.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})

export class ShoppingCartComponent {
  cardId: string = '';
  content: boolean = false;
  sessionsObject: EventSessions | null = new EventSessions();
  sessionsObjectLocal: EventSessions[] = [];

  constructor(private route: ActivatedRoute, public eventsinfo: EventsinfoService) {
    // Se obtiene el parámetro 'id' de la URL
    this.route.params.subscribe(params => {
      this.cardId = params['id'];
    });
    // Se obtiene el resultado del objeto local guardado en el storage del navegador
    let result = localStorage.getItem("TypeCard");
    // Se obtiene el objeto local o se hace una llamada al API dependiendo del resultado obtenido
    this.getResultObjectlocal(result);
  }

  // Método para obtener el objeto local o hacer una llamada al API
  getResultObjectlocal(result: string | null){
    if(result){
      // Se parsea el resultado obtenido en un array de objetos EventSessions
      this.sessionsObjectLocal = JSON.parse(result);
      // Se busca el objeto con el id de evento correspondiente
      let index = this.sessionsObjectLocal.findIndex(item => item.event?.id === this.cardId);
      if(index >= 0){
        // Si se encuentra el objeto se asigna a la variable sessionsObject y se indica que existe contenido
        this.sessionsObject = this.sessionsObjectLocal[index];
        this.content = true;
      }else{
        // Si no se encuentra el objeto se hace una llamada al API
        this.getApiResponse();
      }
    }else{
      // Si no hay resultado se hace una llamada al API
      this.getApiResponse();
    }
  }

  // Método para hacer una llamada al API
  getApiResponse(){
    // Se comprueba si el objeto correspondiente al evento ya se encuentra en el array StateEventSessions
    if (this.eventsinfo.StateEventSessions.some(item => item[this.cardId])){
      // Si se encuentra se asigna a la variable sessionsObject y se indica que existe contenido
      this.content = true;
      this.sessionsObject = this.eventsinfo.StateEventSessions.filter(item => item[this.cardId]?.event?.id == this.cardId)?.[0]?.[this.cardId];
    }else{
      // Si no se encuentra se hace una llamada al API y se asigna a la variable sessionsObject el objeto recibido
      this.eventsinfo.getEventsId(this.cardId).subscribe({
        next: (res: Record<string, EventSessions | null>) => {
          this.content = true;
          this.sessionsObject = res[this.cardId];
        },
        error: () => {
          // Si se produce un error se indica que no existe contenido
          this.content = false;
        },
      });
    }
  }
}

