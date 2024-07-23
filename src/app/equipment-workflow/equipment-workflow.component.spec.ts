import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentWorkflowComponent } from './equipment-workflow.component';

describe('EquipmentWorkflowComponent', () => {
  let component: EquipmentWorkflowComponent;
  let fixture: ComponentFixture<EquipmentWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentWorkflowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipmentWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
