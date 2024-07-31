import { TestBed } from '@angular/core/testing';

import { OperationActivityService } from './operation-activity.service';

describe('OperationActivityService', () => {
  let service: OperationActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
