import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleactorComponent } from './singleactor.component';

describe('SingleactorComponent', () => {
  let component: SingleactorComponent;
  let fixture: ComponentFixture<SingleactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
