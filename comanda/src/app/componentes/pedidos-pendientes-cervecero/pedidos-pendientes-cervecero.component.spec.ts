import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosPendientesCerveceroComponent } from './pedidos-pendientes-cervecero.component';

describe('PedidosPendientesCerveceroComponent', () => {
  let component: PedidosPendientesCerveceroComponent;
  let fixture: ComponentFixture<PedidosPendientesCerveceroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosPendientesCerveceroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosPendientesCerveceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
