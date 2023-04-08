import { TestBed } from '@angular/core/testing';

import { EventsinfoService } from './eventsinfo.service';

describe('EventsinfoService', () => {
  let service: EventsinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
