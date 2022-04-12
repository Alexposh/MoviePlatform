import { Component, NgIterable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';

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

  searchCriteriaField: string[] = ["All", "Movies", "Actors"];
  searchCriteriaFieldSelected: string = '';
  searchTitle: string = '';
  //DDDisplayed:NgIterable<any> | null | undefined;

  filteredOptions: Observable<any[]> = of([]);
  test: string[] = ['1', 'doi', 'trei']
  myControl = new FormControl();
  accessToken: any = localStorage.getItem('ACCESS_TOKEN');

  // optionItems : any[] = [{id: 10, name: 'optiunea 1'}, {id: 20, name: 'optiunea 2'}];
  //   optionItemSelectat: any;
  // schimbareTest(){
  //   console.log('ai selectat ceva: ', this.optionItemSelectat);
  // }

  setCriteriaField(): void {
    console.log('ai selectat ceva: ', this.searchCriteriaFieldSelected);
  }



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



  search() {
    console.log('searching for: ', this.searchTitle);
    // TODO: if(actor | movie)
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
    if (this.searchCriteriaFieldSelected) {
      if (this.searchTitle.length <= 3) {
        console.log("too short criteria");
        return;
      }
      console.log("should search for: ", this.searchTitle);

      console.log('should search WITH AUTOCOMPLETE');
      // TODO: get values for searchTitle 
      const url = `http://localhost:8000/search/${this.searchCriteriaFieldSelected}/${this.searchTitle}`;
          this.http.get<any[]>(url).subscribe(
            DropDownOptions => {
              // ['film x', 'film y'];
            this.filteredOptions = of(DropDownOptions);
            console.log('options shown to the user: ', DropDownOptions);
            }
        );
      console.log('in category: ', this.searchCriteriaFieldSelected);
      // replace the old observable with a new one (GET from index.php)
      // this.filteredOptions = this.http.get<string[]>("/search/{"+this.searchCriteriaFieldSelected+"}/{"+this.searchTitle+"}");
    }


  }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('ACCESS_TOKEN');
    if(this.accessToken){
      this.someoneLogedIn=true;
      console.log('este cineva logat?: ', this.someoneLogedIn);
    }
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
    console.log(this.accessToken);
    // console.log('este cineva logat?: ', this.someoneLogedIn);
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
  

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  clickOption(option: any){
    // check if it should go to the actor or movie page (component) - TODO 01.04.2022 - Done
    
    // this.router.navigate(['/single-movie', option.id]);

    if(option.type_of=="movie"){
      this.router.navigate(['/single-movie/', option.id]);
    }
    if(option.type_of=="actor"){
      this.router.navigate(['/single-actor/', option.id]);
    }
  }
}
