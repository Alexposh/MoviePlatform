import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  // userIsLoggedIn:boolean = false;
  selected_genre: any = "";
  userLoggedIn: any =
    {
      name: "",
      password: ""
    }

  pages: any[] = [
    {
      pagePath: "main",
      pageName: "Home"
    },
    {
      pagePath: "movies",
      pageName: "Movies"
    },
    {
      pagePath: "artists",
      pageName: "Artists"
    },
    {
      pagePath: "genres/" + this.selected_genre,
      pageName: "Go to Genre"
    }
  ]

  userRelated: any[] = [
    {
      linkPath: "login",
      linkName: "Login"
    },
    {
      linkPath: "signup",
      linkName: "Sign up"
    },
    {
      linkPath: "myaccount",
      linkName: "My Account"
    }

  ]





  genreList: any[] = [];
  someoneLogedIn: boolean = false;


  constructor(private http: HttpClient, private router: Router, private loginService: LoginService,
    private _snackBar: MatSnackBar) { }



  afterSelect() {
    console.log("selected: " + this.selected_genre);
    this.router.navigate(['/genres', this.selected_genre]);
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

  searchTitle: string = '';

  search() {
    console.log('searching for: ', this.searchTitle);
    this.router.navigate(['/search-movie', this.searchTitle]);
    // /search-movie/:search-term
  }

  // loger() {
  //   console.log('loging in with username ', this.userLoggedIn.name);
  //   // this.router.navigate(['/log-in', this.searchTitle]);
  //   this.userIsLoggedIn = true;
  //   // /search-movie/:search-term
  // }

  changeSearch() {
    console.log('the search has changed: ', this.searchTitle);
  }

  ngOnInit(): void {
    this.loginService.changes$.subscribe(rez => {
      console.log('modificari local storage:', rez);
      if (localStorage.getItem('ACCESS_TOKEN')) {
        this.someoneLogedIn = true;
      } else {
        this.someoneLogedIn = false;
      }
    });
    console.log('****NG ON INIT NAVIGATION****');
    this.getGenres();
    let accessToken = localStorage.getItem('ACCESS_TOKEN');
    console.log(accessToken);
  }

  signOut() {
    let headers = new HttpHeaders();
    let currentToken = localStorage.getItem('ACCESS_TOKEN');
    headers = headers.set('TokenPentruAcces', currentToken != null ? currentToken : '');
    const url = 'http://localhost:8000/signout';
    return this.http.delete<any>(url, { headers: headers })
      .subscribe(
        rez => {
          console.log('logout operation successful: ', rez);
          // localStorage.clear();
          this.loginService.remove('AUTENTIFICARE');
          this.loginService.remove('ACCESS_TOKEN')
          this.router.navigate(['/main']);
          this.openSnackBar('Successfully logged out', 'Close');
        },
        err => {
          console.log('eroare: ', err);
        }
      );



  }
  accessToken: any = localStorage.getItem('ACCESS_TOKEN');

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
