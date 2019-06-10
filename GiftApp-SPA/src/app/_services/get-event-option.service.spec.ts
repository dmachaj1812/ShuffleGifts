import { TestBed } from '@angular/core/testing';

import { GetEventOptionService } from './get-event-option.service';

describe('GetEventOptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetEventOptionService = TestBed.get(GetEventOptionService);
    expect(service).toBeTruthy();
  });
});
