import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarPedidoCerveceroComponent } from './finalizar-pedido-cervecero.component';

describe('FinalizarPedidoCerveceroComponent', () => {
  let component: FinalizarPedidoCerveceroComponent;
  let fixture: ComponentFixture<FinalizarPedidoCerveceroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarPedidoCerveceroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarPedidoCerveceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
