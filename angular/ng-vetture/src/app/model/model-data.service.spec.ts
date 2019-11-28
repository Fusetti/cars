import { TestBed } from '@angular/core/testing';

import { ModelDataService } from './model-data.service';

describe('ModelDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelDataService = TestBed.get(ModelDataService);
    expect(service).toBeTruthy();
  });
});
