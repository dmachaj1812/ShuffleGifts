import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEditShowComponent } from './event-edit-show.component';

describe('EventEditShowComponent', () => {
  let component: EventEditShowComponent;
  let fixture: ComponentFixture<EventEditShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventEditShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEditShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
