import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosPendientesBartenderComponent } from './pedidos-pendientes-bartender.component';

describe('PedidosPendientesBartenderComponent', () => {
  let component: PedidosPendientesBartenderComponent;
  let fixture: ComponentFixture<PedidosPendientesBartenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosPendientesBartenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosPendientesBartenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
