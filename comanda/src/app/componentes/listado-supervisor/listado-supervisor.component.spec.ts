import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSupervisorComponent } from './listado-supervisor.component';

describe('ListadoSupervisorComponent', () => {
  let component: ListadoSupervisorComponent;
  let fixture: ComponentFixture<ListadoSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
