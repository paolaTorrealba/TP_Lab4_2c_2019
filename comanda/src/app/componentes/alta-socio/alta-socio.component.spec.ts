import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaSocioComponent } from './alta-socio.component';

describe('AltaSocioComponent', () => {
  let component: AltaSocioComponent;
  let fixture: ComponentFixture<AltaSocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaSocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
