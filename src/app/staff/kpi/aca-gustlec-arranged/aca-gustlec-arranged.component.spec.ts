import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaGustlecArrangedComponent } from './aca-gustlec-arranged.component';

describe('AcaGustlecArrangedComponent', () => {
  let component: AcaGustlecArrangedComponent;
  let fixture: ComponentFixture<AcaGustlecArrangedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcaGustlecArrangedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcaGustlecArrangedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
