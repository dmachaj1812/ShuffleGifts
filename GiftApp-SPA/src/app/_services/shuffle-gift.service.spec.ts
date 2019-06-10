import { TestBed } from '@angular/core/testing';

import { ShuffleGiftService } from './shuffle-gift.service';

describe('ShuffleGiftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShuffleGiftService = TestBed.get(ShuffleGiftService);
    expect(service).toBeTruthy();
  });
});
