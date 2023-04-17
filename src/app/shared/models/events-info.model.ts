export class Eventos {
  id?: string;
  title?: string;
  subtitle?: string;
  image?: string;
}

export class Session {
  date: string = '';
  availability: number = 0;
  numberticket: number = 0;
  rangeavailability?: number;
}

export class EventSessions {
  event?: Eventos;
  sessions?: Session[];
}