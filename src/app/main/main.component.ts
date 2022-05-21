import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  

  // pageNumberCurent: any = 0;
  // nrOfMovies: number = -1;
  // numberOfPages: number = -1;
  // pagesBefore: number[] = [];
  // pagesAfter: number[] = [];

  constructor(private http: HttpClient) { }

  // allmovies: any[] = [
  // ];

  // dateIncarcatePePagini: Map<number, any[]> = new Map<number, any[]>();
  // featuredMovie: any[] = [];

  // navigate(type: string) {
  //   console.log('Type of navigation: ', type);
  //   console.log('datele deja incarcate: ', this.dateIncarcatePePagini);

  //   if (type == 'prev') {
  //     // if the movies have already been loaded => read them from a 'cache'
  //     this.pageNumberCurent--;
  //     // this.loadMoviesForPage(this.pageNumberCurent);
  //     // let dacaExistaDeja = this.dateIncarcatePePagini.has(this.pageNumberCurent);
  //     // if(dacaExistaDeja){ // [0, 1, 2, 3, 4...]
  //     //   // data already loaded, put into allmovies
  //     //   this.allmovies = this.dateIncarcatePePagini.get(this.pageNumberCurent) || []; // load from 'cache'
  //     // }else{
  //     this.loadMoviesForPage(this.pageNumberCurent);
  //     // }
  //     // this.allmovies = this.dateIncarcatePePagini.get(this.pageNumberCurent) || [];// this.dateIncarcatePePagini[this.pageNumberCurent];
  //   } else if (type == 'next') {
  //     this.pageNumberCurent++;

  //     console.log('OBJECT KEYS: ', Object.keys(this.dateIncarcatePePagini));
  //     // let dacaExistaDeja =  Object.keys(this.dateIncarcatePePagini).map(x => parseInt(x)).indexOf(this.pageNumberCurent) != -1;
  //     // let dacaExistaDeja = this.dateIncarcatePePagini.has(this.pageNumberCurent);
  //     // console.log('daca exista deja: ', dacaExistaDeja);
  //     // if(dacaExistaDeja){ // [0, 1, 2, 3, 4...]
  //     //   // data already loaded, put into allmovies
  //     //   this.allmovies = this.dateIncarcatePePagini.get(this.pageNumberCurent) || []; // load from 'cache'
  //     // }else{
  //     this.loadMoviesForPage(this.pageNumberCurent);
  //     // }

  //   }
  // }

  // // this method loads the data from the server
  // // if the data has already been loaded => load from cache 
  // loadMoviesForPage(pageNumber: number) {
  //   const url = 'http://localhost:8000/movies-list/' + pageNumber;


  //   let dacaExistaDeja = this.dateIncarcatePePagini.has(pageNumber);
  //   console.log('daca exista deja: ', dacaExistaDeja);
  //   if (dacaExistaDeja) { // [0, 1, 2, 3, 4...]
  //     // data already loaded, put into allmovies
  //     this.allmovies = this.dateIncarcatePePagini.get(pageNumber) || []; // load from 'cache'
  //   } else {
  //     this.http.get<any[]>(url).subscribe(
  //       listaFilme => {
  //         this.allmovies = listaFilme;
  //         // this.allmovies = listaFilme;
  //         console.log(this.allmovies);
  //         // this.dateIncarcatePePagini[pageNumber] = listaFilme;
  //         this.dateIncarcatePePagini.set(pageNumber, listaFilme);
  //       }
  //     );
  //   }
  // }

  // loadMovies() {
  //   const url = 'http://localhost:8000/movies-list/' + this.pageNumberCurent;
  //   // this.pageNumberCurent++;
  //   return this.http.get<any[]>(url).subscribe(
  //     listaFilme => {

  //       this.allmovies = this.allmovies.concat(listaFilme);
  //       // this.allmovies = listaFilme;
  //       console.log(this.allmovies);
  //       // this.dateIncarcatePePagini[this.pageNumberCurent] = listaFilme;
  //       this.dateIncarcatePePagini.set(this.pageNumberCurent, listaFilme);

  //     }
  //   );
  // }

  // // has a big problem
  // navigateToPage(page: number) {
  //   console.log('navigating to page: ', page);
  //   this.pageNumberCurent = page;
  //   this.loadMoviesForPage(this.pageNumberCurent);
  // }

  // navigateLast() {
  //   this.pageNumberCurent = this.numberOfPages;
  //   this.loadMoviesForPage(this.pageNumberCurent);
  // }

  // navigateFirst() {
  //   this.pageNumberCurent = 0;
  //   this.loadMoviesForPage(this.pageNumberCurent);
  // }

  // changePage(page:any){
  //   this.navigateToPage(page);
  // }

  ngOnInit(): void {

    // this.http.get<any>('http://localhost:8000/movie-count')
    //   .subscribe(
    //     rez => {
    //       console.log('rezultat nr of movies: ', rez);
    //       this.nrOfMovies = rez.nr_filme;
    //       this.numberOfPages = Math.floor(this.nrOfMovies / 4) + (this.nrOfMovies % 4 != 0 ? 1 : 0) - 1;
    //       // curenta - left 2, right 2 
    //       // ... - last - curenta > 2
    //       // ... - curenta - 2 > 0
    //     }
    //   );

    // this.loadMovies();
    // localStorage.setItem('info', 'salutare boss');
    // console.log('un test');
    // let obiectCuDate : any = {};
    // obiectCuDate[0] = 'salut';
    // obiectCuDate['1'] = 'boss';
    // console.log('obcud: ', obiectCuDate);
    // console.log('keys: ', Object.keys(obiectCuDate));
    // console.log('---------- better key and value pair -------------');

    // let numere : number[] = [1,2,3];
    // let numere2 : Array<number> = new Array<number>();
    // numere2.push(45);
    // numere2.push(123);
    // console.log("numere2: " + numere2);
    // // numere2.push('65');
    // let obiectCuDateBetter : Map<number, string> = new Map<number, string>();
    // obiectCuDateBetter.set(10, 'hello');
    // obiectCuDateBetter.set(20, 'boss');
    // console.log('obiect cu date better: ', obiectCuDateBetter);

    // console.log('pentru cheia 10: ', obiectCuDateBetter.get(10));
    // if(obiectCuDateBetter.has(30)){
    //   console.log('pentru cheia 30: ', obiectCuDateBetter.get(30));
    // }else{
    //   console.log('cheia nu e valida');
    // }
  }



}
