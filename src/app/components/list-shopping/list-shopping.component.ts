import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { EventSessions } from '../../shared/models/events-info.model';
import { OrderbyPipe } from '../../shared/pipes/orderby.pipe';
import { EventsinfoService } from '../../shared/services/eventsinfo.service';

// Este es el componente de la lista de compras.
@Component({
  selector: 'app-list-shopping', 
  templateUrl: './list-shopping.component.html', 
  styleUrls: ['./list-shopping.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush, // Estrategia de detección de cambios
})
export class ListShoppingComponent {
  @Input() typeCard: EventSessions | null = new EventSessions(); // Entrada de tipo de tarjeta seleccionada

  typecardlocal: EventSessions[] = []; // Variable para almacenar la lista de tipos de tarjeta

  Shoppingcart: EventSessions[] = []; // Variable para almacenar la lista de elementos agregados al carrito de compras

  constructor(
    private cdr: ChangeDetectorRef, // Inyección de dependencia de ChangeDetectorRef
    public eventsinfo: EventsinfoService, 
    public orderbypipe: OrderbyPipe
  ) {
    let result = localStorage.getItem("ShoppingcartLocal"); // Obtener elementos de carrito de compras desde el almacenamiento local
    let resultt = localStorage.getItem("TypeCard"); // Obtener tipos de tarjeta desde el almacenamiento local
    if (result) {
      this.Shoppingcart = JSON.parse(result);
    }
    if (resultt) {
      this.typecardlocal = JSON.parse(resultt);
    }
  }

  // Función para remover una sesión específica de un objeto de la lista de compras
  removesession(a: number, i: number) {
    let objectshopping = this.Shoppingcart[a]; // Obtener objeto de la lista de compras que contiene la sesión a remover
    let object = this.Shoppingcart[a].sessions?.[i]; // Obtener la sesión a remover
    if (objectshopping.event?.id === this.typeCard?.event?.id) { // Verificar si el objeto de la lista de compras pertenece a la tarjeta seleccionada
      let numbertypecard = this.typeCard?.sessions?.findIndex(item => item.date === object?.date); // Encontrar el índice de la sesión en la tarjeta seleccionada
      if (numbertypecard != undefined && numbertypecard >= 0) {
        this.subtractAvailability(numbertypecard); // Restar la disponibilidad de la sesión en la tarjeta seleccionada
      }
    } else { // Si el objeto de la lista de compras no pertenece a la tarjeta seleccionada
      if (object) {
        object.availability = +object.availability + 1; // Aumentar la disponibilidad de la sesión removida
        object.numberticket -= 1; // Reducir el número de tickets de la sesión removida
        if (this.Shoppingcart.length > 0) {
          let cardId = this.Shoppingcart[a].event?.id; // Obtener el id del evento del objeto de la lista de compras
          let date = object.date; // Obtener la fecha de la sesión removida
          let findexj = this.eventsinfo.StateEventSessions.findIndex(item => cardId && item[cardId]); // Encontrar el índice del evento en la lista de eventos del servicio EventsinfoService
          if (findexj >= 0) {
            if (cardId) {
              let findexf = this.eventsinfo.StateEventSessions[findexj][cardId]?.sessions?.findIndex(item => item.date === date); // Encontrar el índice de la sesión en la lista de sesiones del evento
              if (findexf != undefined && findexf >= 0) {
                let objectservice = this.eventsinfo.StateEventSessions[findexj][cardId]?.sessions?.[findexf]; // Obtener el objeto de la sesión del servicio EventsinfoService
                if (objectservice) {
                  objectservice.availability = object.availability; // Actualizar la disponibilidad de la sesión en el servicio EventsinfoService
                  objectservice.numberticket = object.numberticket; // Actualizar el número de tickets de la sesión en el servicio EventsinfoService
                }
              }
            }
          }
        }
      }
      this.addtypercardtolocal(a, i); // Agregar el objeto de la tarjeta seleccionada al almacenamiento local
      this.removeEventSessionsCard(a, i); // Remover la sesión de la lista de compras
      localStorage.setItem("TypeCard", JSON.stringify(this.typecardlocal)); // Guardar la lista de tipos de tarjeta en el almacenamiento local
    }
    if (this.Shoppingcart.length > 0) {
      localStorage.setItem("ShoppingcartLocal", JSON.stringify(this.Shoppingcart)); // Guardar la lista de compras en el almacenamiento local
    }
    this.cdr.detectChanges(); // Detectar cambios en la vista
  }

  

  removeEventSessionsCard(a:number, i:number): void{
    let object = this.Shoppingcart[a].sessions?.[i];
    if(object && object.numberticket === 0){ // Si el objeto existe y el número de tickets es 0
      this.Shoppingcart[a].sessions?.splice(i, 1); // Eliminar el objeto del array
      this.Shoppingcart = this.Shoppingcart.filter((item) => item.sessions && item.sessions.length > 0); // Filtrar el array para eliminar cualquier objeto vacío
      if(this.Shoppingcart.length === 0){ // Si el array de objetos está vacío
        localStorage.removeItem("ShoppingcartLocal"); // Eliminar la entrada "ShoppingcartLocal" del localStorage
      }
    }
  }

  logictypecardlocal(){
    if(this.typeCard){
      let id = this.typeCard.event?.id;
      if(this.typecardlocal.length > 0){ // Si hay objetos en el array "typecardlocal"
        let index = this.typecardlocal.findIndex(item => item.event?.id === id);
        if(index >= 0){ // Si se encuentra un objeto con el mismo id en el array "typecardlocal"
          this.typecardlocal.splice(index, 1); // Eliminar ese objeto
          this.typecardlocal.push(this.typeCard); // Añadir el objeto actual
        }else{
          this.typecardlocal.push(this.typeCard); // Si no hay ningún objeto con el mismo id, añadir el objeto actual
        }
      }else{
        this.typecardlocal.push(this.typeCard); // Si no hay ningún objeto en el array "typecardlocal", añadir el objeto actual
      }
    }
  }

  addtypercardtolocal(a?:number, i?:number){
    // Comprobar si se proporcionaron los índices a e i, y si son valores válidos
    if(a != undefined && a >= 0 && i!= undefined && i >= 0){
      // Si el objeto "typeCard" y el array "Shoppingcart" existen y el id del evento en el objeto "typeCard" coincide con el id del evento en el objeto "Shoppingcart"
      if(this.typeCard && this.Shoppingcart && this.typeCard.event?.id === this.Shoppingcart[a].event?.id){ 
        // Si coinciden los ids de eventos, llamar a la función "logictypecardlocal"
        this.logictypecardlocal();
      }else{
        // Si no coinciden los ids de eventos, actualizar los datos de typecardlocal para la sesión correspondiente
        let id = this.Shoppingcart[a].event?.id;
        let date = this.Shoppingcart[a].sessions?.[i].date;
        let Shoppingcart = this.Shoppingcart[a].sessions?.[i];
        // Comprobar si la sesión de "Shoppingcart" existe
        if(Shoppingcart){
          // Comprobar si typecardlocal y Shoppingcart no están vacíos
          if(this.typecardlocal.length > 0 && this.Shoppingcart.length > 0){
            // Encontrar el índice de la sesión correspondiente en typecardlocal
            let index = this.typecardlocal.findIndex(item => item.event?.id === id);
            // Si se encuentra el índice, actualizar los datos de la sesión correspondiente en typecardlocal
            if(index >= 0){
              let indexL = this.typecardlocal[index].sessions?.findIndex(item => item.date === date);
              if(indexL != undefined && indexL >= 0){
                let typercardlocal = this.typecardlocal[index].sessions?.[indexL];
                if(typercardlocal){
                  typercardlocal.availability = Shoppingcart.availability;
                  typercardlocal.numberticket = Shoppingcart.numberticket;
                }
              }
            }
          }
        }
      }
    }else{
      // Si no se proporcionan índices, llamar a la función "logictypecardlocal"
      this.logictypecardlocal();
    }
  }

  /** 
  * Resta una cantidad de un ticket de la sesión en el objeto typeCard
  * i - el índice de la sesión en el objeto typeCard
  */
  subtractAvailability(i: number) {
    let object = this.typeCard?.sessions?.[i]; // Obtener el objeto session de typeCard según el índice proporcionado
    if(object){
      if(object.numberticket > 0){ // Verificar si quedan boletos disponibles en el objeto session
        object.availability = +object.availability + 1; // Aumentar la disponibilidad del objeto session
        object.numberticket -= 1; // Disminuir el número de boletos disponibles en el objeto session
        if(this.typeCard){
          if(this.typeCard.event?.id && this.typeCard.sessions?.[i]){
            let id = this.typeCard.event.id; // Obtener el id del evento del objeto typeCard
            let fecha = this.typeCard.sessions[i].date; // Obtener la fecha del objeto session de typeCard según el índice proporcionado
            if(this.Shoppingcart){
              let findex1: number = this.Shoppingcart.findIndex((item) => {
                return item.event?.id === id; // Encontrar el índice del evento en el array Shoppingcart
              });
              let findex2: number = -1;
              if(findex1 >= 0){
                let object = this.Shoppingcart[findex1].sessions; // Obtener las sesiones del evento en el array Shoppingcart
                if(object){
                  findex2 = object.findIndex((element) => {
                    return element.date === fecha; // Encontrar el índice de la sesión en el array de sesiones del evento en el array Shoppingcart
                  });
                  if(findex2 >= 0){
                    let sessions = this.Shoppingcart[findex1].sessions;
                    if(sessions){
                      if(sessions[findex2]){
                        //ver avaibility
                        sessions[findex2].availability = this.typeCard.sessions[i].availability // Actualizar la disponibilidad en el objeto session en el array Shoppingcart
                        sessions[findex2].numberticket = this.typeCard.sessions[i].numberticket; // Actualizar el número de boletos disponibles en el objeto session en el array Shoppingcart
                        this.removeEventSessionsCard(findex1, findex2); // Llamar a la función removeEventSessionsCard para eliminar el objeto session en typeCard y Shoppingcart si no hay boletos disponibles
                      }
                    }
                  }
                }
              }
            }
            this.addtypercardtolocal(); // Llamar a la función addtypercardtolocal para actualizar el objeto typeCard en localStorage
          }
        }
      }
    }
    localStorage.setItem("TypeCard", JSON.stringify(this.typecardlocal)); // Actualizar el objeto typecardlocal en localStorage
    localStorage.setItem("ShoppingcartLocal", JSON.stringify(this.Shoppingcart)); // Actualizar el array Shoppingcart en localStorage
    this.cdr.detectChanges(); // Actualizar la vista
  }

  
    /**
   * Función que incrementa la disponibilidad de una sesión en una tarjeta de tipo.
   * i Indice de la sesión en la tarjeta de tipo.
   */
  addAvailability(i: number) {
    // Obtenemos el objeto sesión correspondiente al índice indicado.
    let object = this.typeCard?.sessions?.[i];
    if(object){
      // Verificamos si hay disponibilidad para añadir un ticket.
      if(object.availability > 0){
        // Incrementamos el número de tickets y decrementamos la disponibilidad.
        object.numberticket += 1;
        object.availability = +object.availability - 1;
        if(this.typeCard){
          // Verificamos que el evento y la sesión existan en la tarjeta de tipo.
          if(this.typeCard.event?.id && this.typeCard.sessions?.[i]){
            // Obtiene el ID del evento y la fecha de la sesión
            let id = this.typeCard.event.id;
            let fecha = this.typeCard.sessions[i].date;
            // Filtramos las sesiones de la tarjeta de tipo para obtener solo las que tienen tickets disponibles.
            let objectfilter = this.typeCard.sessions.filter(item => item.numberticket > 0);
            // Creamos un objeto de tipo EventSessions con el evento y las sesiones filtradas.
            const record: EventSessions = { event: this.typeCard.event, sessions: objectfilter };
            // Busca el índice del evento en el carrito de compras
            let findex1: number = this.Shoppingcart.findIndex((item) => {
              return item.event?.id === id;
            });
            // Busca el índice de la sesión en el carrito de compras
            let findex2: number = -1;
            if(findex1 >= 0){
              let object = this.Shoppingcart[findex1].sessions;
              if(object){
                // Buscamos el índice de la sesión en el carrito de compras.
                findex2 = object.findIndex((element) => {
                  return element.date === fecha;
                });
              }
            }
            // Verificamos si el carrito de compras tiene elementos.
            if(this.Shoppingcart.length > 0){
              // Verificamos si el evento ya existe en el carrito de compras.
              if(findex1 >= 0){
                if(this.Shoppingcart[findex1]){
                  // Verificamos si la sesión ya existe en el carrito de compras.
                  if(findex2 >= 0){
                    let sessions = this.Shoppingcart[findex1].sessions;
                    if(sessions){
                      if(sessions[findex2]){
                        // Actualizamos la disponibilidad y el número de tickets de la sesión en el carrito de compras.
                        sessions[findex2].availability = this.typeCard.sessions[i].availability;
                        sessions[findex2].numberticket = this.typeCard.sessions[i].numberticket;
                      }else{
                        // Si la sesión no existe en el carrito, se agrega y se ordena por fecha
                        sessions.push(this.typeCard.sessions[i]);
                        this.orderbypipe.transform(this.Shoppingcart[findex1].sessions);
                      }
                    }
                  }else{
                    // Si la sesión no existe en el carrito, se agrega y se ordena por fecha
                    this.Shoppingcart[findex1].sessions?.push(this.typeCard.sessions[i]);
                    this.orderbypipe.transform(this.Shoppingcart[findex1].sessions);
                  }
                }else{
                  // Si el evento no existe en el carrito, se agrega y se ordena por fecha
                  this.Shoppingcart.push(this.typeCard);
                  this.orderbypipe.transform(this.Shoppingcart[findex1].sessions);
                }
              }else{
                // Si el evento no existe en el carrito, se agrega y se ordena por fecha
                this.Shoppingcart.push(record);
                this.orderbypipe.transform(record.sessions);
              }
            }else{
              // Si el carrito de compras está vacío, se agrega el evento y las sesiones filtradas
              this.Shoppingcart.push(record);
              this.orderbypipe.transform(record.sessions);
            }
            // Actualiza la información de la tarjeta de tipo en el almacenamiento local
            this.addtypercardtolocal();
            localStorage.setItem("TypeCard", JSON.stringify(this.typecardlocal));
          }
        }
      }
    }
    localStorage.setItem("ShoppingcartLocal", JSON.stringify(this.Shoppingcart));
    this.cdr.detectChanges();
  }
}
