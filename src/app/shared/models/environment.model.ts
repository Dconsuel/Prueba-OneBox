export interface Environment {
  production: boolean;
  baseUrl: string;
  endpoints: Endpoints;
}

interface Endpoints {
  eventInfo68: Endpoint;
  eventInfo184: Endpoint;
  events: Endpoint;
}

interface Endpoint {
  method: string;
  url: string;
  responseType: string;
}
