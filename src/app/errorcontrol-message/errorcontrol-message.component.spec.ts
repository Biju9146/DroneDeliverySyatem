import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorcontrolMessageComponent } from './errorcontrol-message.component';

describe('ErrorcontrolMessageComponent', () => {
  let component: ErrorcontrolMessageComponent;
  let fixture: ComponentFixture<ErrorcontrolMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorcontrolMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorcontrolMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
