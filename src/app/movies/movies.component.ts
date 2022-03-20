import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  pageNumberCurent: any = 0;
  nrOfMovies: number = -1;
  numberOfPages: number = -1;
  pagesBefore: number[] = [];
  pagesAfter: number[] = [];
  accessToken: string | null = '';

  constructor(private http: HttpClient) { }

  allmovies: any[] = [
  ];

  dateIncarcatePePagini: Map<number, any[]> = new Map<number, any[]>();
  featuredMovie: any[] = [];

  navigate(type: string) {
    console.log('Type of navigation: ', type);
    console.log('datele deja incarcate: ', this.dateIncarcatePePagini);

    if (type == 'prev') {
      
      this.pageNumberCurent--;
      
      this.loadMoviesForPage(this.pageNumberCurent);
      
    } else if (type == 'next') {
      this.pageNumberCurent++;

      console.log('OBJECT KEYS: ', Object.keys(this.dateIncarcatePePagini));
      
      this.loadMoviesForPage(this.pageNumberCurent);
     

    }
  }
 
  loadMoviesForPage(pageNumber: number) {
    const url = 'http://localhost:8000/movies-list/' + pageNumber;


    let dacaExistaDeja = this.dateIncarcatePePagini.has(pageNumber);
    console.log('daca exista deja: ', dacaExistaDeja);
    if (dacaExistaDeja) {       
      this.allmovies = this.dateIncarcatePePagini.get(pageNumber) || []; // load from 'cache'
    } else {
      this.http.get<any[]>(url).subscribe(
        listaFilme => {
          this.allmovies = listaFilme;
          console.log(this.allmovies);
          this.dateIncarcatePePagini.set(pageNumber, listaFilme);
        }
      );
    }
  }

  loadMovies() {
    const url = 'http://localhost:8000/movies-list/' + this.pageNumberCurent;
    return this.http.get<any[]>(url).subscribe(
      listaFilme => {

        this.allmovies = this.allmovies.concat(listaFilme);
         console.log(this.allmovies);
         this.dateIncarcatePePagini.set(this.pageNumberCurent, listaFilme);

      }
    );
  }

  navigateToPage(page: number) {
    console.log('navigating to page: ', page);
    this.pageNumberCurent = page;
    this.loadMoviesForPage(this.pageNumberCurent);
  }

  navigateLast() {
    this.pageNumberCurent = this.numberOfPages;
    this.loadMoviesForPage(this.pageNumberCurent);
  }

  navigateFirst() {
    this.pageNumberCurent = 0;
    this.loadMoviesForPage(this.pageNumberCurent);
  }

  changePage(page:any){
    this.navigateToPage(page);
  }

  ngOnInit(): void {

    if(localStorage.getItem('ACCESS_TOKEN') != null){
      this.accessToken = localStorage.getItem('ACCESS_TOKEN');
    }
    this.http.get<any>('http://localhost:8000/movie-count')
      .subscribe(
        rez => {
          console.log('rezultat nr of movies: ', rez);
          this.nrOfMovies = rez.nr_filme;
          this.numberOfPages = Math.floor(this.nrOfMovies / 4) + (this.nrOfMovies % 4 != 0 ? 1 : 0) - 1;
        
        }
      );

    this.loadMoviesForPage(this.pageNumberCurent);
        
  }

}
