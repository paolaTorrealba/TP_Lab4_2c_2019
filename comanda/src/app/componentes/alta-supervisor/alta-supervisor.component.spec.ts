import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaSupervisorComponent } from './alta-supervisor.component';

describe('AltaSupervisorComponent', () => {
  let component: AltaSupervisorComponent;
  let fixture: ComponentFixture<AltaSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
