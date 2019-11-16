import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarPedidoCocineroComponent } from './finalizar-pedido-cocinero.component';

describe('FinalizarPedidoCocineroComponent', () => {
  let component: FinalizarPedidoCocineroComponent;
  let fixture: ComponentFixture<FinalizarPedidoCocineroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarPedidoCocineroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarPedidoCocineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
