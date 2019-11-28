import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBrandsComponent } from './show-brands.component';

describe('ShowBrandsComponent', () => {
  let component: ShowBrandsComponent;
  let fixture: ComponentFixture<ShowBrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
