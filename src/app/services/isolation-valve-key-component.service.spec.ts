import { TestBed } from '@angular/core/testing';

import { IsolationValveKeyComponentService } from './isolation-valve-key-component.service';

describe('IsolationValveKeyComponentService', () => {
  let service: IsolationValveKeyComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsolationValveKeyComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
