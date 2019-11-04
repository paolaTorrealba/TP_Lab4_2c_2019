import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarDeliveryComponent } from './confirmar-delivery.component';

describe('ConfirmarDeliveryComponent', () => {
  let component: ConfirmarDeliveryComponent;
  let fixture: ComponentFixture<ConfirmarDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
