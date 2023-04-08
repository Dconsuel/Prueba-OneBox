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
      },
      error: () => {
      },
    });
  }
}
