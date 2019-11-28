import { TestBed } from '@angular/core/testing';

import { BrandDataService } from './brand-data.service';

describe('BrandDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrandDataService = TestBed.get(BrandDataService);
    expect(service).toBeTruthy();
  });
});
