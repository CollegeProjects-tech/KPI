import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipleComponent } from './principle.component';

describe('PrincipleComponent', () => {
  let component: PrincipleComponent;
  let fixture: ComponentFixture<PrincipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrincipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
