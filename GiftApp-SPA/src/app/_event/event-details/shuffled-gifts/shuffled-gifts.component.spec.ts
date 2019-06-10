import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuffledGiftsComponent } from './shuffled-gifts.component';

describe('ShuffledGiftsComponent', () => {
  let component: ShuffledGiftsComponent;
  let fixture: ComponentFixture<ShuffledGiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShuffledGiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShuffledGiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
