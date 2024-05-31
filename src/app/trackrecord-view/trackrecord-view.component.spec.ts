import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackrecordViewComponent } from './trackrecord-view.component';

describe('TrackrecordViewComponent', () => {
  let component: TrackrecordViewComponent;
  let fixture: ComponentFixture<TrackrecordViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackrecordViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackrecordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
