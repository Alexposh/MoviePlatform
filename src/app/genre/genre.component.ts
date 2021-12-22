import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie';
import { Page } from '../models/page';


class NavigationPage{
  pageNumber?: number;
  pageLabel?: string;
}

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  moviesFromGenre: Movie[] = [];
  genreSelected: string = "";
  pageNumberCurrent: any = 0;


  // TODO: how can we avoid any[] and specify a type instead
  // ! we cannot use number[] pentru ca '...'
  pageRangeArray: any[] = []; // [3,4,5,6,7]

  nrOfMoviesInGenre: number = -1;
  numberOfPagesInGenre: number = -1;
  dateIncarcatePeGenre: Map<string, any[]> = new Map<string, any[]>();

  
  // dateIncarcatePeGenre: Map<string, Map<number, any[]>> = ...
  // 'Sci-Fi'
      // 0 - [...]
      // 1 - [...]
  // 'Drama'
      // 0 - [...]
      // ...
  // previouslyLoadedGenre: string = '';

  navigate(type: string) {
    console.log('Type of navigation: ', type);
    if (type == 'prev') {
      // if the movies have already been loaded => read them from a 'cache'
      this.pageNumberCurrent--;
      // this.loadMoviesForPage(this.pageNumberCurent);
      // this.moviesFromGenre = this.dateIncarcatePeGenre.get(this.pageNumberCurrent) || [];// this.dateIncarcatePePagini[this.pageNumberCurent];
      this.loadMoviesFromGenre(this.pageNumberCurrent);
    } else if (type == 'next') {
      this.pageNumberCurrent++;

      console.log('OBJECT KEYS: ', Object.keys(this.dateIncarcatePeGenre));
      // let dacaExistaDeja =  Object.keys(this.dateIncarcatePePagini).map(x => parseInt(x)).indexOf(this.pageNumberCurent) != -1;
      // let dacaExistaDeja = this.dateIncarcatePeGenre.has(this.pageNumberCurrent);
      // console.log('daca exista deja: ', dacaExistaDeja);
      // if(dacaExistaDeja){ // [0, 1, 2, 3, 4...]
      // data already loaded, put into allmovies
      // this.moviesFromGenre = this.dateIncarcatePeGenre.get(this.pageNumberCurrent) || []; // load from 'cache'
      // }else{
      // this.loadMoviesFromGenre(this.pageNumberCurrent);
      // }
      this.loadMoviesFromGenre(this.pageNumberCurrent);

    }
  }

  loadMoviesFromGenre(page: number): void {
    console.log('loading movies');
    let dacaExistaDeja = this.dateIncarcatePeGenre.has(this.pageNumberCurrent);
    console.log('daca exista deja: ', dacaExistaDeja);
    console.log('DATE INCARCATE IN CACHE: ', this.dateIncarcatePeGenre)
    if (dacaExistaDeja) {
      this.moviesFromGenre = this.dateIncarcatePeGenre.get(this.genreSelected+'-'+page) || []; // load from 'cache'
    } else {
      const url = 'http://localhost:8000/movies-in-genre-by-genre-id-extra-details/' + this.genreSelected + '/' + page;
      // return this.http.get<any[]>(url);
      this.http.get<any>(url).subscribe(
        listaFilme => {
          this.moviesFromGenre = listaFilme['theMoviesOnCurrentPage'];// this.moviesFromGenre.concat(listaFilme);
          console.log(this.moviesFromGenre);
          this.dateIncarcatePeGenre.set(this.genreSelected+'-'+this.pageNumberCurrent, listaFilme['theMoviesOnCurrentPage']);

          this.nrOfMoviesInGenre = listaFilme['numberOfMovies'];
          this.numberOfPagesInGenre = Math.floor(this.nrOfMoviesInGenre / 4) + (this.nrOfMoviesInGenre % 4 != 0 ? 1 : 0) - 1;


          this.pageRangeArray = [page-2, page-1, page, page+1, page+2];
          this.pageRangeArray = this.pageRangeArray.filter(x => x >= 0).filter(x => x <= this.numberOfPagesInGenre);
          if(page > 3){
            this.pageRangeArray = ['...'].concat(this.pageRangeArray);
          }
          // this.dateIncarcatePeGenre.set(this.genreSelected+'-'+this.pageNumberCurrent, listaFilme.currentPageItems);
          // currentPageItems


        }
      );
    }
  }

  displayCache(){
    console.log('CACHE: ', this.dateIncarcatePeGenre);
  }

  navigateLast() {
    this.pageNumberCurrent = this.numberOfPagesInGenre;
    this.loadMoviesFromGenre(this.pageNumberCurrent);
  }

  navigateFirst() {
    this.pageNumberCurrent = 0;
    this.loadMoviesFromGenre(this.pageNumberCurrent);
  }

  // page: NavigationPage
  navigateToPage(page: any) {
    if(page == '...'){
      return;
    }
    this.pageNumberCurrent = page;
    this.loadMoviesFromGenre(this.pageNumberCurrent);
  }

  // setBasicInfo() {
  //   this.http.get<any>(`http://localhost:8000/movie-count-in-genre/${this.genreSelected}`)
  //     .subscribe(
  //       rez => {
  //         console.log('rezultat nr of movies in genre: ', rez);
  //         this.nrOfMoviesInGenre = rez.nr_filme;
  //         this.numberOfPagesInGenre = Math.floor(this.nrOfMoviesInGenre / 4) + (this.nrOfMoviesInGenre % 4 != 0 ? 1 : 0) - 1;
  //         console.log('number of pages: ', this.numberOfPagesInGenre);
  //         // curenta - left 2, right 2 
  //         // ... - last - curenta > 2
  //         // ... - curenta - 2 > 0

  //         {
  //           [];
  //         }
  //       }
  //     );
  // }
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    console.log('GENRE ngOnInit')
    this.activatedRoute.params.subscribe(x => {
      console.log('x = ', x); // search-term
      this.genreSelected = x['selected-genre'];
      console.log(this.genreSelected);
      // this.http.get<any[]>(`http://localhost:8000/movies-in-genre-by-genre-id/${this.genreSelected}/${this.pageNumberCurrent}`)
      //   .subscribe(
      //     rezultateSelect => {
      //       this.moviesFromGenre = rezultateSelect;
      //       console.log('filme gasite in ', this.genreSelected, ": ", this.moviesFromGenre);
      //     }
      //   );
      this.loadMoviesFromGenre(0);
    });

    // this.setBasicInfo();


  }

}
