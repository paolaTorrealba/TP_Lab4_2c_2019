import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosPendientesCocineroComponent } from './pedidos-pendientes-cocinero.component';

describe('PedidosPendientesCocineroComponent', () => {
  let component: PedidosPendientesCocineroComponent;
  let fixture: ComponentFixture<PedidosPendientesCocineroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosPendientesCocineroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosPendientesCocineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
