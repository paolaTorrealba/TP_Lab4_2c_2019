import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaClientesEstadoComponent } from './lista-clientes-estado.component';

describe('ListaClientesEstadoComponent', () => {
  let component: ListaClientesEstadoComponent;
  let fixture: ComponentFixture<ListaClientesEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaClientesEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaClientesEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
