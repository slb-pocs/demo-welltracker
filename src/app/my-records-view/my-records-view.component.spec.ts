import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecordsViewComponent } from './my-records-view.component';

describe('MyRecordsViewComponent', () => {
  let component: MyRecordsViewComponent;
  let fixture: ComponentFixture<MyRecordsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyRecordsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyRecordsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
