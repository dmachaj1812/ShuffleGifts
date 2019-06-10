import { TestBed, inject } from '@angular/core/testing';

import { LoginRegisterModalService } from './login-register-modal.service';

describe('LoginRegisterModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginRegisterModalService]
    });
  });

  it('should be created', inject([LoginRegisterModalService], (service: LoginRegisterModalService) => {
    expect(service).toBeTruthy();
  }));
});
