import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellDetailedDataComponent } from './well-detailed-data.component';

describe('WellDetaileDataComponent', () => {
  let component: WellDetailedDataComponent;
  let fixture: ComponentFixture<WellDetailedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WellDetailedDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WellDetailedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
