// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from "src/app/shared/models/environment.model";

export const environment: Environment = {
  production: false,
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
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
