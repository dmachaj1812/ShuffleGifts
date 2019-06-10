import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGiftFromWishlistComponent } from './add-gift-from-wishlist.component';

describe('AddGiftFromWishlistComponent', () => {
  let component: AddGiftFromWishlistComponent;
  let fixture: ComponentFixture<AddGiftFromWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGiftFromWishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGiftFromWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
