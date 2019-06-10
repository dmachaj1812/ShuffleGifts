import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassswordChangeComponent } from './passsword-change.component';

describe('PassswordChangeComponent', () => {
  let component: PassswordChangeComponent;
  let fixture: ComponentFixture<PassswordChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassswordChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
