import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private http: HttpClient) { }
  genreList:any[]=[];
  
  getGenres() {

    // let headers = new HttpHeaders();
    // let at = localStorage.getItem('ACCESS_TOKEN');
    // headers = headers.set('TokenPentruAcces', at != null ? at : '');
    ///, {headers: headers} - this was next to url before subscribe
    const url = 'http://localhost:8000/movie-genres';
    return this.http.get<any>(url).subscribe(
      genresList => {
        this.genreList = genresList;
        console.log('genres: ', this.genreList);
      }
    );

  }
  ngOnInit(): void {
    this.getGenres();
  }

}
