import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellOptionsViewComponent } from './well-options-view.component';

describe('WellOptionsViewComponent', () => {
  let component: WellOptionsViewComponent;
  let fixture: ComponentFixture<WellOptionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WellOptionsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WellOptionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
