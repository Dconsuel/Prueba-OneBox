import { Environment } from "src/app/shared/models/environment.model";

export const environment: Environment = {
  production: true,
  baseUrl: '',
  endpoints: {
    eventInfo: {
      method: 'GET',
      url: 'assets/mocks/event-info-#.json',
      responseType: 'json',
    },
    events: {
      method: 'GET',
      url: 'assets/mocks/events.json',
      responseType: 'json',
    }
  },
};
