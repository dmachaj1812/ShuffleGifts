import { TestBed } from '@angular/core/testing';

import { GetSeededDataService } from './get-seeded-data.service';

describe('GetSeededDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetSeededDataService = TestBed.get(GetSeededDataService);
    expect(service).toBeTruthy();
  });
});
