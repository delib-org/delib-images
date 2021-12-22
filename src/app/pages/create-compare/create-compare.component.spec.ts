import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompareComponent } from './create-compare.component';

describe('CreateCompareComponent', () => {
  let component: CreateCompareComponent;
  let fixture: ComponentFixture<CreateCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
