import { TestBed, inject } from '@angular/core/testing';

import { AuthintercepterService } from './authintercepter.service';

describe('AuthintercepterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthintercepterService]
    });
  });

  it('should be created', inject([AuthintercepterService], (service: AuthintercepterService) => {
    expect(service).toBeTruthy();
  }));
});
