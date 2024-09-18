import { TestBed } from '@angular/core/testing';

import { IsolationValveJobService } from './isolation-valve-job.service';

describe('IsolationValveJobService', () => {
  let service: IsolationValveJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsolationValveJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
