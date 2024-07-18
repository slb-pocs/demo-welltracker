import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StemDataComponent } from './stem-data.component';

describe('StemDataComponent', () => {
  let component: StemDataComponent;
  let fixture: ComponentFixture<StemDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StemDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
