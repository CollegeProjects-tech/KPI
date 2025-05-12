import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdpSttpWorkshopComponent } from './fdp-sttp-workshop.component';

describe('FdpSttpWorkshopComponent', () => {
  let component: FdpSttpWorkshopComponent;
  let fixture: ComponentFixture<FdpSttpWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FdpSttpWorkshopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FdpSttpWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
