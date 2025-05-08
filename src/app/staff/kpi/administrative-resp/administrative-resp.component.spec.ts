import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeRespComponent } from './administrative-resp.component';

describe('AdministrativeRespComponent', () => {
  let component: AdministrativeRespComponent;
  let fixture: ComponentFixture<AdministrativeRespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrativeRespComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministrativeRespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
