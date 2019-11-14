import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPedidoClienteComponent } from './ver-pedido-cliente.component';

describe('VerPedidoClienteComponent', () => {
  let component: VerPedidoClienteComponent;
  let fixture: ComponentFixture<VerPedidoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPedidoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPedidoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
