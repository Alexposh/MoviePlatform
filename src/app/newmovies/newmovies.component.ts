import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie';
import { NavigationPage } from '../models/navigation.page';
import { MovieSinopsysDialogComponent } from '../movie-sinopsys-dialog/movie-sinopsys-dialog.component';
import { environment } from 'src/environments/environment';
import { MoviesService } from '../movies.service';
 

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-newmovies',
  templateUrl: './newmovies.component.html',
  styleUrls: ['./newmovies.component.css']
})
export class NewmoviesComponent implements OnInit {
  
  pageNumberCurent: any = 0;
  nrOfMovies: number = -1;
  numberOfPages: number = -1;
  pagesBefore: number[] = [];
  pagesAfter: number[] = [];
  accessToken: string | null = '';
  @Input() category: any = {category_id: -1, genre_name: "all"};


  constructor(private http: HttpClient, public dialog: MatDialog,private moviesService: MoviesService) { }

  allmovies: any[] = [
  ];

  openSynopsisDialog(movie: Movie){
    this.dialog.open(MovieSinopsysDialogComponent, {
      data: movie
    });
  }

  
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


  // loadMoviesForPage(pageNumber: number) {
  //   const url = 'http://localhost:8000/new-movies-list/' + pageNumber;
  //   let dacaExistaDeja = this.dateIncarcatePePagini.has(pageNumber);
  //   console.log('daca exista deja: ', dacaExistaDeja);
  //   if (dacaExistaDeja) {       
  //     this.allmovies = this.dateIncarcatePePagini.get(pageNumber) || []; // load from 'cache'
  //   } else { 
  //     this.http.get<any[]>(url,{
  //       headers: new HttpHeaders({
  //         "category": this.category
          
  //       })
  //     }).subscribe(
  //       listaFilme => {
  //         this.allmovies = listaFilme;
          
  //         this.dateIncarcatePePagini.set(pageNumber, listaFilme);
  //       }
  //     );
  //   }
  // }

  loadMoviesForPage(pageNumber: number) {
    // const url = environment.serverContextPath + '/movies-in-genre-by-genre-id-extra-details/' + (this.category.genre_id ? this.category.genre_id : '-1') + '/' + pageNumber;
    let dacaExistaDeja = this.dateIncarcatePePagini.has(pageNumber);
    // console.log('daca exista deja: ', dacaExistaDeja);
    if (dacaExistaDeja) {       
      this.allmovies = this.dateIncarcatePePagini.get(pageNumber) || []; // load from 'cache'
    } else { 
      this.moviesService.getMoviesForPage(this.category.genre_id, pageNumber)
      // this.http.get<any>(url
      //   ,{
      //   headers: new HttpHeaders({
      //     "genre": this.category
          
      //   })
      // }
      .subscribe(
        listaFilme => {
          this.allmovies = listaFilme.theMoviesOnCurrentPage;
          this.nrOfMovies = listaFilme.numberOfMovies;
          this.numberOfPages = Math.floor(this.nrOfMovies / 4) + (this.nrOfMovies % 4 != 0 ? 1 : 0) - 1;
          this.dateIncarcatePePagini.set(pageNumber, listaFilme.theMoviesOnCurrentPage);

          this.http.post<Array<any>>(`http://localhost:8000/movies-images-load`, this.allmovies.map(x => x.movie_id))
            .subscribe(
              imaginile => {
                for(let movie of this.allmovies){
                  for(let imagine of imaginile){
                    if(movie.movie_id == imagine.id && imagine.image){
                      movie['poster']=imagine.image;
                    }
                  }
                }                
              },
              err => {
                console.log(err);
              }
            );

          // this.allmovies.forEach(movie => {
          //   console.log('should load photo of movie with id: ', movie.movie_id);
          //   const getPhotoUrl = "http://localhost:8000/movie-image-load/"+movie.movie_id;
          //   this.http.get<any[]>(getPhotoUrl).subscribe(
          //     photoContents=>{
          //       movie['poster']=photoContents;
          //     }
          //   ) 
            
          // })
        }
      );
    }
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
    console.log('changing page: ', page);
    this.navigateToPage(page);
  }

  // countMoviesInCategory(){
  //   this.http.get<any>('http://localhost:8000/new-movie-count',{
  //     headers: new HttpHeaders({
  //       "category": this.category        
  //     })
  //   })
  //   .subscribe(
  //     rez => {
  //       console.log('rezultat nr of movies: ', rez);
  //       this.nrOfMovies = rez.nr_filme;
  //       this.numberOfPages = Math.floor(this.nrOfMovies / 4) + (this.nrOfMovies % 4 != 0 ? 1 : 0) - 1;
      
  //     }
  //   )
  // }

  ngOnInit(): void {

    console.log('category / genre: ', this.category);
    if(localStorage.getItem('ACCESS_TOKEN') != null){
      this.accessToken = localStorage.getItem('ACCESS_TOKEN');
    }
    // this.countMoviesInCategory();

    this.loadMoviesForPage(this.pageNumberCurent);
        
  }

  
}


