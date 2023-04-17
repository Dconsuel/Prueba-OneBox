export interface Environment {
  production: boolean;
  baseUrl: string;
  endpoints: Endpoints;
}

interface Endpoints {
  eventInfo: Endpoint;
  events: Endpoint;
}

interface Endpoint {
  method: string;
  url: string;
  responseType: string;
}
