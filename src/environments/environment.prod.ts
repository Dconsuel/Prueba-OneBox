import { Environment } from "src/app/shared/models/environment.model";

export const environment: Environment = {
  production: true,
  baseUrl: '',
  endpoints: {
    eventInfo68: {
      method: 'GET',
      url: 'assets/mocks/event-info-68.json',
      responseType: 'json',
    },
    eventInfo184: {
      method: 'GET',
      url: 'assets/mocks/event-info-184.json',
      responseType: 'json',
    },
    events: {
      method: 'GET',
      url: 'assets/mocks/events.json',
      responseType: 'json',
    }
  },
};
