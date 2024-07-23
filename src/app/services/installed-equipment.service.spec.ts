import { TestBed } from '@angular/core/testing';

import { InstalledEquipmentService } from './installed-equipment.service';

describe('InstalledEquipmentService', () => {
  let service: InstalledEquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstalledEquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
