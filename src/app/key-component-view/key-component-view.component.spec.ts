import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyComponentViewComponent } from './key-component-view.component';

describe('KeyComponentViewComponent', () => {
  let component: KeyComponentViewComponent;
  let fixture: ComponentFixture<KeyComponentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyComponentViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeyComponentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
