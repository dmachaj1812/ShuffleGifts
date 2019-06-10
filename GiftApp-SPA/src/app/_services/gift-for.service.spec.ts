import { TestBed, inject } from '@angular/core/testing';

import { GiftForService } from './gift-for.service';

describe('GiftForService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GiftForService]
    });
  });

  it('should be created', inject([GiftForService], (service: GiftForService) => {
    expect(service).toBeTruthy();
  }));
});
