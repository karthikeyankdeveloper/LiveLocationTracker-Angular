import { TestBed } from '@angular/core/testing';

import { CryptographyService } from './cryptography.service';

describe('CryptographyService', () => {
  let service: CryptographyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptographyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
