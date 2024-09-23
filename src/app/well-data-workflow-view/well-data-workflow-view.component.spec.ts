import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellDataWorkflowViewComponent } from './well-data-workflow-view.component';

describe('WellDataWorkflowViewComponent', () => {
  let component: WellDataWorkflowViewComponent;
  let fixture: ComponentFixture<WellDataWorkflowViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WellDataWorkflowViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WellDataWorkflowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
