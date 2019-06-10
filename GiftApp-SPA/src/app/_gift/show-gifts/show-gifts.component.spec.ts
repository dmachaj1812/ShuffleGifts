import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGiftsComponent } from './show-gifts.component';

describe('ShowGiftsComponent', () => {
  let component: ShowGiftsComponent;
  let fixture: ComponentFixture<ShowGiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowGiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowGiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
