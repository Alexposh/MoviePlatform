import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movies';
  searchTitle: string = '';

  constructor(private router : Router) {

  }

  search() {
    console.log('searching for: ', this.searchTitle);
    this.router.navigate(['/search-movie', this.searchTitle]);
    // /search-movie/:search-term
  }

  changeSearch(){
    console.log('the search has changed: ', this.searchTitle);
  }
}
