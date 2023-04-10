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
}
