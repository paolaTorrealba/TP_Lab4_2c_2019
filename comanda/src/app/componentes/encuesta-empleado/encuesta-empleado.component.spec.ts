import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaEmpleadoComponent } from './encuesta-empleado.component';

describe('EncuestaEmpleadoComponent', () => {
  let component: EncuestaEmpleadoComponent;
  let fixture: ComponentFixture<EncuestaEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
