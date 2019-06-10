import { TestBed, async, inject } from '@angular/core/testing';

import { PassChangeGuard } from './pass-change.guard';

describe('PassChangeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassChangeGuard]
    });
  });

  it('should ...', inject([PassChangeGuard], (guard: PassChangeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
