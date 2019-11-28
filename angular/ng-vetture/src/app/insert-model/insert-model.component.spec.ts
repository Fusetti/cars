import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertModelComponent } from './insert-model.component';

describe('InsertModelComponent', () => {
  let component: InsertModelComponent;
  let fixture: ComponentFixture<InsertModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
