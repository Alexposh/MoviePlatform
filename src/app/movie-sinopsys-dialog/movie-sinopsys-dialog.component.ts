import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-sinopsys-dialog',
  templateUrl: './movie-sinopsys-dialog.component.html',
  styleUrls: ['./movie-sinopsys-dialog.component.css']
})
export class MovieSinopsysDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Movie) { }

  ngOnInit(): void {
    console.log('in dialog, data este: ', this.data);
  }

}
