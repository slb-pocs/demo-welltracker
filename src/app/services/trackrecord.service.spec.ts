import { TestBed } from '@angular/core/testing';

import { TrackrecordService } from './trackrecord.service';

describe('TrackrecordService', () => {
  let service: TrackrecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackrecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
