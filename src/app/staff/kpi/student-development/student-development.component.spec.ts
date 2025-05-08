import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDevelopmentComponent } from './student-development.component';

describe('StudentDevelopmentComponent', () => {
  let component: StudentDevelopmentComponent;
  let fixture: ComponentFixture<StudentDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDevelopmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
