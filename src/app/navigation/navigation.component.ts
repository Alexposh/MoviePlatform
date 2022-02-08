import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  selected_genre:any="";
  userLoggedIn:any=
    {
      name: "",
      password:""
    }

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

  userRelated:any[]=[
    {
      linkPath:"login",
      linkName: "Login"
    },
    {
      linkPath:"signup",
      linkName:"Sign up"
    }

  ]


  
  

  genreList:any[]=[];

  constructor(private http:HttpClient, private router : Router) { }

  

  afterSelect(){
    console.log("selected: "+this.selected_genre);
    this.router.navigate(['/genres', this.selected_genre]);
  }
  getGenres(){

    let headers = new HttpHeaders();
    let at = localStorage.getItem('ACCESS_TOKEN');
    headers = headers.set('TokenPentruAcces', at != null ? at : '');
    const url = 'http://localhost:8000/movie-genres';
    return this.http.get<any>(url, {headers: headers}).subscribe(
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

  loger() {
    console.log('loging in with username ', this.userLoggedIn.name);
    this.router.navigate(['/log-in', this.searchTitle]);
    // /search-movie/:search-term
  }

  changeSearch(){
    console.log('the search has changed: ', this.searchTitle);
  }
  
  ngOnInit(): void {
    this.getGenres();
  }

  signOut(){
    this.http.delete('http://localhost:8000/signout/'+localStorage.getItem('ACCESS_TOKEN'))
      .subscribe(
        rez => {
          console.log('logout operation successful: ', rez);
          localStorage.clear();
    this.router.navigate(['/main']);
        }
      );
    
    
    
  }
}
