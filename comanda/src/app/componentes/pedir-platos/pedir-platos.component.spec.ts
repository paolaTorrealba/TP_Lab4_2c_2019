import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedirPlatosComponent } from './pedir-platos.component';

describe('PedirPlatosComponent', () => {
  let component: PedirPlatosComponent;
  let fixture: ComponentFixture<PedirPlatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirPlatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedirPlatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
