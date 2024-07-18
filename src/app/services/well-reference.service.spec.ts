import { TestBed } from '@angular/core/testing';

import { WellReferenceService } from './well-reference.service';

describe('WellReferenceService', () => {
  let service: WellReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WellReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
