export interface Eventos {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface Session {
  date: string;
  availability: string;
}

export interface EventSessions {
  event: Eventos;
  sessions: Session[];
}
