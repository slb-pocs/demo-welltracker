import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionDataComponent } from './completion-data.component';

describe('CompletionDataComponent', () => {
  let component: CompletionDataComponent;
  let fixture: ComponentFixture<CompletionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletionDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
