import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movies';
  searchTitle: string = '';
  

  constructor(private router : Router, private loginService: LoginService) {

  }

  search() {
    console.log('searching for: ', this.searchTitle);
    this.router.navigate(['/search-movie', this.searchTitle]);
    // /search-movie/:search-term
  }

  changeSearch(){
    console.log('the search has changed: ', this.searchTitle);
  }

  loginEventTriggered(){
    console.log('something happened on login component')
  }
}
