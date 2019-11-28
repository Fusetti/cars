import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertBrandComponent } from './insert-brand.component';

describe('InsertBrandComponent', () => {
  let component: InsertBrandComponent;
  let fixture: ComponentFixture<InsertBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
