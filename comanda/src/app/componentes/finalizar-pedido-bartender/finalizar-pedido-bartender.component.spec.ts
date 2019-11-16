import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarPedidoBartenderComponent } from './finalizar-pedido-bartender.component';

describe('FinalizarPedidoBartenderComponent', () => {
  let component: FinalizarPedidoBartenderComponent;
  let fixture: ComponentFixture<FinalizarPedidoBartenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarPedidoBartenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarPedidoBartenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
