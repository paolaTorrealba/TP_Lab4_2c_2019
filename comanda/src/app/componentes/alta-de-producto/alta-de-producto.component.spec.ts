import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDeProductoComponent } from './alta-de-producto.component';

describe('AltaDeProductoComponent', () => {
  let component: AltaDeProductoComponent;
  let fixture: ComponentFixture<AltaDeProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaDeProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaDeProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
