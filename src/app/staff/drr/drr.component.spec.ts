import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrrComponent } from './drr.component';

describe('DrrComponent', () => {
  let component: DrrComponent;
  let fixture: ComponentFixture<DrrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
