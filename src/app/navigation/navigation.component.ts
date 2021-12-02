import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  selected_genre:any="";

  pages:any[]=[
    {
      pagePath: "main",
      pageName: "Home"
    },
    {
      pagePath: "genres/"+this.selected_genre,
      pageName: "Go to Genre"
    }
  ]

  genreList:any[]=[];

  constructor(private http:HttpClient, private router : Router) { }

  

  afterSelect(){
    console.log("selected: "+this.selected_genre);
    this.router.navigate(['/genres', this.selected_genre]);
  }
  getGenres(){
    const url = 'http://localhost:8000/movie-genres';
    return this.http.get<any>(url).subscribe(
      genresList=>{
        this.genreList = genresList;
        console.log('genres: ', this.genreList);
      }
    );

  }

  searchTitle: string = '';

  search() {
    console.log('searching for: ', this.searchTitle);
    this.router.navigate(['/search-movie', this.searchTitle]);
    // /search-movie/:search-term
  }

  changeSearch(){
    console.log('the search has changed: ', this.searchTitle);
  }
  
  ngOnInit(): void {
    this.getGenres();
  }

}
