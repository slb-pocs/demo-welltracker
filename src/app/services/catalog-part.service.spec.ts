import { TestBed } from '@angular/core/testing';

import { CatalogPartService } from './catalog-part.service';

describe('CatalogPartService', () => {
  let service: CatalogPartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogPartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
