import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDeMesaComponent } from './alta-de-mesa.component';

describe('AltaDeMesaComponent', () => {
  let component: AltaDeMesaComponent;
  let fixture: ComponentFixture<AltaDeMesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaDeMesaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaDeMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
