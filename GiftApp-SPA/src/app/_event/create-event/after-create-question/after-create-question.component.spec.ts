import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterCreateQuestionComponent } from './after-create-question.component';

describe('AfterCreateQuestionComponent', () => {
  let component: AfterCreateQuestionComponent;
  let fixture: ComponentFixture<AfterCreateQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterCreateQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterCreateQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
