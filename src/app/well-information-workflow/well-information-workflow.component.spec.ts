import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellInformationWorkflowComponent } from './well-information-workflow.component';

describe('WellInformationWorkflowComponent', () => {
  let component: WellInformationWorkflowComponent;
  let fixture: ComponentFixture<WellInformationWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WellInformationWorkflowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WellInformationWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
