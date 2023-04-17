import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventSessions } from 'src/app/shared/models/events-info.model';
import { EventsinfoService } from 'src/app/shared/services/eventsinfo.service';
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

  constructor(private route: ActivatedRoute, private eventsinfo: EventsinfoService) {
    this.route.params.subscribe(params => {
      this.cardId = params['id'];
    });
    let result = localStorage.getItem("TypeCard");
    if(result){
      this.sessionsObjectLocal = JSON.parse(result);
      let index = this.sessionsObjectLocal.findIndex(item => item.event?.id === this.cardId);
      if(index >= 0){
        this.sessionsObject = this.sessionsObjectLocal[index];
        this.content = true;
      }else{
        this.getApiResponse();
      }
    }else{
      this.getApiResponse();
    }
  }

  getApiResponse(){
    if (this.eventsinfo.StateEventSessions.some(item => item[this.cardId])){
      this.content = true;
      this.sessionsObject = this.eventsinfo.StateEventSessions.filter(item => item[this.cardId]?.event?.id == this.cardId)?.[0]?.[this.cardId];
    }else{
      this.eventsinfo.getEventsId(this.cardId).subscribe({
      next: (res: Record<string, EventSessions | null>) => {
        this.content = true;
        this.sessionsObject = res[this.cardId];
      },
      error: () => {
        this.content = false;
      },
      });
    }
  }

}
