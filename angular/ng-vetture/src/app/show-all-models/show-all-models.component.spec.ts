import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllModelsComponent } from './show-all-models.component';

describe('ShowAllModelsComponent', () => {
  let component: ShowAllModelsComponent;
  let fixture: ComponentFixture<ShowAllModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
