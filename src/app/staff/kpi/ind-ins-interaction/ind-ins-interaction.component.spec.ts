import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndInsInteractionComponent } from './ind-ins-interaction.component';

describe('IndInsInteractionComponent', () => {
  let component: IndInsInteractionComponent;
  let fixture: ComponentFixture<IndInsInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndInsInteractionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndInsInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
