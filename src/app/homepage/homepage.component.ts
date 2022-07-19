import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Homepage } from '../models/homepage';
import { HomepageCategory } from '../models/HomepageCategory';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private http: HttpClient) { }
  genreList:any[]=[];
  
  dateIncarcatePeHomepage: HomepageCategory[] = [];

  @HostListener("window:scroll", [])
  onScroll(): void {
    console.log('offset height: ', document.body.offsetHeight);
    console.log('scroll height: ', document.body.scrollHeight);
    console.log('scroll Y: ', window.scrollY);
  if ((window.scrollY + document.body.offsetHeight + 250) >= document.body.scrollHeight) {
          // you're at the bottom of the page
          console.log('bottom of page!!!');
      }
  }

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
