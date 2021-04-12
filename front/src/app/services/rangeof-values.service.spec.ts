import { TestBed } from '@angular/core/testing';

import { RangeofValuesService } from './rangeof-values.service';

describe('RangeofValuesService', () => {
  let service: RangeofValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RangeofValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
