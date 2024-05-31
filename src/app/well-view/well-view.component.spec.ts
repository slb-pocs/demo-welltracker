import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellViewComponent } from './well-view.component';

describe('WellViewComponent', () => {
  let component: WellViewComponent;
  let fixture: ComponentFixture<WellViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WellViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WellViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
