import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGiftsListEventComponent } from './my-gifts-list-event.component';

describe('MyGiftsListEventComponent', () => {
  let component: MyGiftsListEventComponent;
  let fixture: ComponentFixture<MyGiftsListEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGiftsListEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGiftsListEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
