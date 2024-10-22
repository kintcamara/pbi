import { TestBed } from '@angular/core/testing';

import { AuthAzureService } from './auth-azure.service';

describe('AuthAzureService', () => {
  let service: AuthAzureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthAzureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
