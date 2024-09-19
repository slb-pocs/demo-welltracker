import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsolationValveJobViewComponent } from './isolation-valve-job-view.component';

describe('IsolationValveJobViewComponent', () => {
  let component: IsolationValveJobViewComponent;
  let fixture: ComponentFixture<IsolationValveJobViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsolationValveJobViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IsolationValveJobViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
