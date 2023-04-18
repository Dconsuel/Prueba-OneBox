import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { EventSessions } from '../../shared/models/events-info.model';
import { OrderbyPipe } from '../../shared/pipes/orderby.pipe';
import { EventsinfoService } from '../../shared/services/eventsinfo.service';

@Component({
  selector: 'app-list-shopping',
  templateUrl: './list-shopping.component.html',
  styleUrls: ['./list-shopping.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListShoppingComponent {
  @Input() typeCard: EventSessions | null = new EventSessions();

  typecardlocal: EventSessions[] = [];

  Shoppingcart: EventSessions[] = [];

  constructor(private cdr: ChangeDetectorRef, public eventsinfo: EventsinfoService, public orderbypipe: OrderbyPipe){
    let result = localStorage.getItem("ShoppingcartLocal");
    let resultt = localStorage.getItem("TypeCard");
    if(result){
      this.Shoppingcart = JSON.parse(result);
    }
    if(resultt){
      this.typecardlocal = JSON.parse(resultt);
    }
  }

  removesession(a:number, i:number){
    let objectshopping = this.Shoppingcart[a];
    let object = this.Shoppingcart[a].sessions?.[i];
    if(objectshopping.event?.id === this.typeCard?.event?.id){
      let numbertypecard = this.typeCard?.sessions?.findIndex(item => item.date === object?.date);
      if(numbertypecard != undefined && numbertypecard >= 0){
        this.subtractAvailability(numbertypecard);
      }
    }else{
      if(object){
        object.availability = +object.availability + 1;
        object.numberticket -= 1;
        if(this.Shoppingcart.length > 0){
          let cardId = this.Shoppingcart[a].event?.id;
          let date = object.date;
          let findexj = this.eventsinfo.StateEventSessions.findIndex(item => cardId && item[cardId]);
          if(findexj >= 0){
            if(cardId){
              let findexf = this.eventsinfo.StateEventSessions[findexj][cardId]?.sessions?.findIndex(item => item.date === date);
              if(findexf != undefined && findexf >= 0){
                let objectservice = this.eventsinfo.StateEventSessions[findexj][cardId]?.sessions?.[findexf];
                if(objectservice){
                  objectservice.availability = object.availability;
                  objectservice.numberticket = object.numberticket;
                }
              }
            }
          }
        }
      }
      this.addtypercardtolocal(a,i);
      this.removeEventSessionsCard(a,i);
      localStorage.setItem("TypeCard", JSON.stringify(this.typecardlocal));
    }
    if(this.Shoppingcart.length > 0){
      localStorage.setItem("ShoppingcartLocal", JSON.stringify(this.Shoppingcart));
    }
    this.cdr.detectChanges();
  }
  

  removeEventSessionsCard(a:number, i:number): void{
    let object = this.Shoppingcart[a].sessions?.[i];
    if(object && object.numberticket === 0){
      this.Shoppingcart[a].sessions?.splice(i, 1);
      this.Shoppingcart = this.Shoppingcart.filter((item) => item.sessions && item.sessions.length > 0);
      if(this.Shoppingcart.length === 0){
        localStorage.removeItem("ShoppingcartLocal");
      }
    }
  }

  logictypecardlocal(){
    if(this.typeCard){
      let id = this.typeCard.event?.id;
      if(this.typecardlocal.length > 0){
        let index = this.typecardlocal.findIndex(item => item.event?.id === id);
        if(index >= 0){
          this.typecardlocal.splice(index, 1);
          this.typecardlocal.push(this.typeCard);
        }else{
          this.typecardlocal.push(this.typeCard);
        }
      }else{
        this.typecardlocal.push(this.typeCard);
      }
    }
  }

  addtypercardtolocal(a?:number, i?:number){
    if(a != undefined && a >= 0 && i!= undefined && i >= 0){
      if(this.typeCard && this.Shoppingcart && this.typeCard.event?.id === this.Shoppingcart[a].event?.id){
        this.logictypecardlocal();
      }else{
        let id = this.Shoppingcart[a].event?.id;
        let date = this.Shoppingcart[a].sessions?.[i].date;
        let Shoppingcart = this.Shoppingcart[a].sessions?.[i];
        if(Shoppingcart){
          if(this.typecardlocal.length > 0 && this.Shoppingcart.length > 0){
            let index = this.typecardlocal.findIndex(item => item.event?.id === id);
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
      this.logictypecardlocal();
    }
  }

  subtractAvailability(i: number) {
    let object = this.typeCard?.sessions?.[i];
    if(object){
      if(object.numberticket > 0){
        object.availability = +object.availability + 1;
        object.numberticket -= 1;
        if(this.typeCard){
          if(this.typeCard.event?.id && this.typeCard.sessions?.[i]){
            let id = this.typeCard.event.id;
            let fecha = this.typeCard.sessions[i].date;
            if(this.Shoppingcart){
              let findex1: number = this.Shoppingcart.findIndex((item) => {
                return item.event?.id === id;
              });
              let findex2: number = -1;
              if(findex1 >= 0){
                let object = this.Shoppingcart[findex1].sessions;
                if(object){
                  findex2 = object.findIndex((element) => {
                    return element.date === fecha;
                  });
                  if(findex2 >= 0){
                    let sessions = this.Shoppingcart[findex1].sessions;
                    if(sessions){
                      if(sessions[findex2]){
                        //ver avaibility
                        sessions[findex2].availability = this.typeCard.sessions[i].availability
                        sessions[findex2].numberticket = this.typeCard.sessions[i].numberticket;
                        this.removeEventSessionsCard(findex1, findex2);
                      }
                    }
                  }
                }
              }
            }
            this.addtypercardtolocal();
          }
        }
      }
    }
    localStorage.setItem("TypeCard", JSON.stringify(this.typecardlocal));
    localStorage.setItem("ShoppingcartLocal", JSON.stringify(this.Shoppingcart));
    this.cdr.detectChanges();
  }
  
  addAvailability(i: number) {
    let object = this.typeCard?.sessions?.[i];
    if(object){
      if(object.availability > 0){
        object.numberticket += 1;
        object.availability = +object.availability - 1;
        if(this.typeCard){
          if(this.typeCard.event?.id && this.typeCard.sessions?.[i]){
            let id = this.typeCard.event.id;
            let fecha = this.typeCard.sessions[i].date;
            let objectfilter = this.typeCard.sessions.filter(item => item.numberticket > 0);
            const record: EventSessions = { event: this.typeCard.event, sessions: objectfilter };
            let findex1: number = this.Shoppingcart.findIndex((item) => {
              return item.event?.id === id;
            });
            let findex2: number = -1;
            if(findex1 >= 0){
              let object = this.Shoppingcart[findex1].sessions;
              if(object){
                findex2 = object.findIndex((element) => {
                  return element.date === fecha;
                });
              }
            }
            if(this.Shoppingcart.length > 0){
              if(findex1 >= 0){
                if(this.Shoppingcart[findex1]){
                  if(findex2 >= 0){
                    let sessions = this.Shoppingcart[findex1].sessions;
                    if(sessions){
                      if(sessions[findex2]){
                        sessions[findex2].availability = this.typeCard.sessions[i].availability;
                        sessions[findex2].numberticket = this.typeCard.sessions[i].numberticket;
                      }else{
                        sessions.push(this.typeCard.sessions[i]);
                        this.orderbypipe.transform(this.Shoppingcart[findex1].sessions);
                      }
                    }
                  }else{
                     this.Shoppingcart[findex1].sessions?.push(this.typeCard.sessions[i]);
                     this.orderbypipe.transform(this.Shoppingcart[findex1].sessions);
                  }
                }else{
                  this.Shoppingcart.push(this.typeCard);
                  this.orderbypipe.transform(this.Shoppingcart[findex1].sessions);
                }
              }else{
                this.Shoppingcart.push(record);
                this.orderbypipe.transform(record.sessions);
              }
            }else{
              this.Shoppingcart.push(record);
              this.orderbypipe.transform(record.sessions);
            }
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
