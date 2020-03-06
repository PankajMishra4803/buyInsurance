import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePamentModeComponent } from './change-pament-mode.component';

describe('ChangePamentModeComponent', () => {
  let component: ChangePamentModeComponent;
  let fixture: ComponentFixture<ChangePamentModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePamentModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePamentModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
