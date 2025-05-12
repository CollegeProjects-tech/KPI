import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSecRespComponent } from './exam-sec-resp.component';

describe('ExamSecRespComponent', () => {
  let component: ExamSecRespComponent;
  let fixture: ComponentFixture<ExamSecRespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamSecRespComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamSecRespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
