import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerBiReport2Component } from './power-bi-report-2.component';

describe('PowerBiReport2Component', () => {
  let component: PowerBiReport2Component;
  let fixture: ComponentFixture<PowerBiReport2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PowerBiReport2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerBiReport2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
