import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPartcipantsComponent } from './event-partcipants.component';

describe('EventPartcipantsComponent', () => {
  let component: EventPartcipantsComponent;
  let fixture: ComponentFixture<EventPartcipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPartcipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPartcipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
