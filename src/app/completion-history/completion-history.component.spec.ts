import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionHistoryComponent } from './completion-history.component';

describe('CompletionHistoryComponent', () => {
  let component: CompletionHistoryComponent;
  let fixture: ComponentFixture<CompletionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletionHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
