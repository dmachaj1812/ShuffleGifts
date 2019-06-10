import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendingEventListComponent } from './attending-event-list.component';

describe('AttendingEventListComponent', () => {
  let component: AttendingEventListComponent;
  let fixture: ComponentFixture<AttendingEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendingEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendingEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
