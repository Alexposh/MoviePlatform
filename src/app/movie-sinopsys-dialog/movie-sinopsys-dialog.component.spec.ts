import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSinopsysDialogComponent } from './movie-sinopsys-dialog.component';

describe('MovieSinopsysDialogComponent', () => {
  let component: MovieSinopsysDialogComponent;
  let fixture: ComponentFixture<MovieSinopsysDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieSinopsysDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSinopsysDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
