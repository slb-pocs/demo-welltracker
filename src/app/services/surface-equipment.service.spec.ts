import { TestBed } from '@angular/core/testing';

import { SurfaceEquipmentService } from './surface-equipment.service';

describe('SurfaceEquipmentService', () => {
  let service: SurfaceEquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurfaceEquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
