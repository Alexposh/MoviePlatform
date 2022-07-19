import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieSinopsysDialogComponent } from '../movie-sinopsys-dialog/movie-sinopsys-dialog.component';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent implements OnInit {

  movies : any[] = [];
  searchTerm : string = '';
  constructor(private activatedRoute : ActivatedRoute, public dialog: MatDialog,private http : HttpClient) { }

  openSynopsisDialog(movie: Movie){
    this.dialog.open(MovieSinopsysDialogComponent, {
      data: movie
    });
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x => {
      console.log('x = ', x); // search-term
      this.searchTerm = x['search-term'];
      this.http.get<any[]>(`http://localhost:8000/search-movie/${this.searchTerm}`)
        .subscribe(
          rezultateSearch => {
            this.movies = rezultateSearch;
            console.log('filme gasite: ', this.movies);
            this.http.post<Array<any>>(`http://localhost:8000/movies-images-load`, this.movies.map(x => x.movie_id))
            .subscribe(
              imaginile => {
                for(let movie of this.movies){
                  for(let imagine of imaginile){
                    if(movie.movie_id == imagine.id && imagine.image){
                      movie['poster']=imagine.image;
                    }
                  }
                }                
              },
              err => {
                console.log(err);
              }
            );
          }
        );
    });
  }

}
