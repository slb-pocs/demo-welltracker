import { TestBed } from '@angular/core/testing';

import { CompletionInitialDataService } from './completion-initial-data.service';

describe('CompletionInitialDataService', () => {
  let service: CompletionInitialDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletionInitialDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
