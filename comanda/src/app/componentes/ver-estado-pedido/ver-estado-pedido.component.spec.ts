import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEstadoPedidoComponent } from './ver-estado-pedido.component';

describe('VerEstadoPedidoComponent', () => {
  let component: VerEstadoPedidoComponent;
  let fixture: ComponentFixture<VerEstadoPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerEstadoPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEstadoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
