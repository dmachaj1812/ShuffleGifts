import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostingEventListComponent } from './hosting-event-list.component';

describe('HostingEventListComponent', () => {
  let component: HostingEventListComponent;
  let fixture: ComponentFixture<HostingEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostingEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostingEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
