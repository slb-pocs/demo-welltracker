import { TestBed } from '@angular/core/testing';

import { ManagementCountryServiceService } from './management-country-service.service';

describe('ManagementCountryServiceService', () => {
  let service: ManagementCountryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementCountryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
