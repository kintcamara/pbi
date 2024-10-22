import { TestBed } from '@angular/core/testing';

import { PowerbiAuthService } from './powerbi-auth.service';

describe('PowerbiAuthService', () => {
  let service: PowerbiAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerbiAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
