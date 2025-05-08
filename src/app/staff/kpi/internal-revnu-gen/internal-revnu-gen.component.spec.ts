import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalRevnuGenComponent } from './internal-revnu-gen.component';

describe('InternalRevnuGenComponent', () => {
  let component: InternalRevnuGenComponent;
  let fixture: ComponentFixture<InternalRevnuGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalRevnuGenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternalRevnuGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
