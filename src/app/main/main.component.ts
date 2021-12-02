import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  pageNumberCurent : any = 0;
  nrOfMovoes : number = -1;

  constructor( private http:HttpClient) { }
  

  allmovies:any[]=[
 
  ];


  // pagina - datele
  // 0 - []
  // 1 - []
  // 2 - []
  // dateIncarcatePePagini : any = {

  // };
  dateIncarcatePePagini : Map<number, any[]> = new Map<number, any[]>();

  featuredMovie:any[]=[];

  navigate(type : string){
    console.log('Type of navigation: ', type);
    console.log('datele deja incarcate: ', this.dateIncarcatePePagini);
    if(type == 'prev'){
      // if the movies have already been loaded => read them from a 'cache'
      this.pageNumberCurent--;
      // this.loadMoviesForPage(this.pageNumberCurent);
      this.allmovies = this.dateIncarcatePePagini.get(this.pageNumberCurent) || [];// this.dateIncarcatePePagini[this.pageNumberCurent];
    }else if(type == 'next'){
      this.pageNumberCurent++;

      console.log('OBJECT KEYS: ', Object.keys(this.dateIncarcatePePagini));
      // let dacaExistaDeja =  Object.keys(this.dateIncarcatePePagini).map(x => parseInt(x)).indexOf(this.pageNumberCurent) != -1;
      let dacaExistaDeja = this.dateIncarcatePePagini.has(this.pageNumberCurent);
      console.log('daca exista deja: ', dacaExistaDeja);
      if(dacaExistaDeja){ // [0, 1, 2, 3, 4...]
        // data already loaded, put into allmovies
        this.allmovies = this.dateIncarcatePePagini.get(this.pageNumberCurent) || []; // load from 'cache'
      }else{
        this.loadMoviesForPage(this.pageNumberCurent);
      }
      
    }
  }

  loadMoviesForPage(pageNumber : number){
    const url = 'http://localhost:8000/movies-list/'+pageNumber;
    return this.http.get<any[]>(url).subscribe(
      listaFilme=>{
        this.allmovies = listaFilme;
        // this.allmovies = listaFilme;
        console.log(this.allmovies);
        // this.dateIncarcatePePagini[pageNumber] = listaFilme;
        this.dateIncarcatePePagini.set(pageNumber, listaFilme);
      }
    );
  }

  loadMovies(){
    const url = 'http://localhost:8000/movies-list/'+this.pageNumberCurent;
    // this.pageNumberCurent++;
    return this.http.get<any[]>(url).subscribe(
      listaFilme=>{
        this.allmovies = this.allmovies.concat(listaFilme);
        // this.allmovies = listaFilme;
        console.log(this.allmovies);
        // this.dateIncarcatePePagini[this.pageNumberCurent] = listaFilme;
        this.dateIncarcatePePagini.set(this.pageNumberCurent, listaFilme);

      }
    );
  }

  // loadSingleMovie(id:number){
  //   const url = 'http://localhost:8000/movie-item/'+id;
  //   return this.http.get<any[]>(url).subscribe(
  //     selectedMovie=>{
  //       this.featuredMovie = selectedMovie;
  //     }
  //   );
  // }

  ngOnInit(): void {

    this.http.get('http://localhost:8000/movie-count')
      .subscribe(
        rez => {
          console.log('rezultat nr of movies: ', rez);
        }
      );

    this.loadMovies();
    // localStorage.setItem('info', 'salutare boss');
    console.log('un test');
    let obiectCuDate : any = {};
    obiectCuDate[0] = 'salut';
    obiectCuDate['1'] = 'boss';
    console.log('obcud: ', obiectCuDate);
    console.log('keys: ', Object.keys(obiectCuDate));
    console.log('---------- better key and value pair -------------');
    
    let numere : number[] = [1,2,3];
    let numere2 : Array<number> = new Array<number>();
    numere2.push(45);
    numere2.push(123);
    // numere2.push('65');
    let obiectCuDateBetter : Map<number, string> = new Map<number, string>();
    obiectCuDateBetter.set(10, 'hello');
    obiectCuDateBetter.set(20, 'boss');
    console.log('obiect cu date better: ', obiectCuDateBetter);

    console.log('pentru cheia 10: ', obiectCuDateBetter.get(10));
    if(obiectCuDateBetter.has(30)){
      console.log('pentru cheia 30: ', obiectCuDateBetter.get(30));
    }else{
      console.log('cheia nu e valida');
    }
  }

}
