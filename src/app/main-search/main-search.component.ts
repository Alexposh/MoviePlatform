import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent implements OnInit {

  movies : any[] = [];
  searchTerm : string = '';
  constructor(private activatedRoute : ActivatedRoute, private http : HttpClient) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x => {
      console.log('x = ', x); // search-term
      this.searchTerm = x['search-term'];
      this.http.get<any[]>(`http://localhost:8000/search-movie/${this.searchTerm}`)
        .subscribe(
          rezultateSearch => {
            this.movies = rezultateSearch;
            console.log('filme gasite: ', this.movies);
          }
        );
    });
  }

}
