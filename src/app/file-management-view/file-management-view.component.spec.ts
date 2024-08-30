import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileManagementViewComponent } from './file-management-view.component';

describe('FileManagementViewComponent', () => {
  let component: FileManagementViewComponent;
  let fixture: ComponentFixture<FileManagementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileManagementViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
