import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDeClienteComponent } from './alta-de-cliente.component';

describe('AltaDeClienteComponent', () => {
  let component: AltaDeClienteComponent;
  let fixture: ComponentFixture<AltaDeClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaDeClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaDeClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
