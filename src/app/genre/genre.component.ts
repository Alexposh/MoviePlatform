import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

moviesFromGenre:any[]=[];
genreSelected:string="";

  constructor(private activatedRoute : ActivatedRoute, private http : HttpClient) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x => {
      console.log('x = ', x); // search-term
      this.genreSelected = x['selected-genre'];
      console.log(this.genreSelected);
      this.http.get<any[]>(`http://localhost:8000/movies-in-genre-by-genre-id/${this.genreSelected}`)
      .subscribe(
          rezultateSelect => {
            this.moviesFromGenre = rezultateSelect;
            console.log('filme gasite in ',this.genreSelected,": ", this.moviesFromGenre);
          }
        );
    });



  }

}
