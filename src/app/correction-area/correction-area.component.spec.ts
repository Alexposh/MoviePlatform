import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionAreaComponent } from './correction-area.component';

describe('CorrectionAreaComponent', () => {
  let component: CorrectionAreaComponent;
  let fixture: ComponentFixture<CorrectionAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectionAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
