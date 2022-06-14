import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist';
import { Movie } from '../models/movie';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  likedMovies: Movie[] = [];
  wishlistMovies: Movie[] = [];
  hatedMovies: Movie[] = [];
  userLoggedInId: number = -1;

  likedActors: any[] = [];
  likedDirectors: any[] = [];


  /**
   * Method which gets info about the user by a token param
   */
  identifyUser() {
    const url = 'http://localhost:8000/find-user/' + localStorage.getItem("ACCESS_TOKEN");
    this.http.get<any>(url).subscribe(
      userIdentified => {
        this.userLoggedInId = userIdentified;
        console.log(this.userLoggedInId);
      }
    );
  }

  getMoviesOpinions(opinion: number): void {

    console.log('loading movies for user ' + this.userLoggedInId);

    // const url = 'http://localhost:8000/movies-opinions/'+ opinion + '/' + uid;
    // http://localhost:8000/movies-opinions/1/30
    // http://localhost:8000/movies-opinions/1/69
    const url = 'http://localhost:8000/movies-opinions/'+ opinion;
    const token = localStorage.getItem("ACCESS_TOKEN");
    this.http.get<any>(url, {
      headers: new HttpHeaders({
        "TokenPentruAcces": (token ? token : '')
      })
    }).subscribe(
      listaFilme => {
        if (opinion == 1) {
          this.likedMovies = listaFilme;
        }
        if (opinion == 2) {
          this.wishlistMovies = listaFilme;
        }
        if (opinion == 3) {
          this.hatedMovies = listaFilme;
        }

        console.log(this.likedMovies);
        
      }
    );
  }

  /**
   * 
   * @param job 'actor' | 'director
   */
  getArtistOpinions(job: string): void {

    console.log('loading movies for user with token ' + localStorage.getItem("ACCESS_TOKEN"));

    const url = 'http://localhost:8000/artist-likes/' + job;

    const token = localStorage.getItem("ACCESS_TOKEN");
    this.http.get<any>(url, {
      headers: new HttpHeaders({
        "TokenPentruAcces": (token ? token : '')
      })
    }).subscribe(
      listaArtisti => {
        if (job == 'actor') {
          this.likedActors = listaArtisti;
        }
        
        if (job == 'director') {
          this.likedDirectors = listaArtisti;
        }

        console.log(this.likedActors);
        console.log(this.likedDirectors);
      }
    );
  }
  // getLikedMovies():void{

  //     console.log('loading movies for user');

  //     const url = 'http://localhost:8000/movies-liked-by-user/'+this.userLoggedInId;
  //       // return this.http.get<any[]>(url);
  //       this.http.get<any>(url).subscribe(
  //         listaFilme => {
  //           this.likedMovies = listaFilme;
  //           console.log(this.likedMovies);
  //         }
  //       );  
  // }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.identifyUser();
    this.http.get('http://localhost:8000/test-echo')
      .subscribe(
        rez => {
          console.log('rezultat: ', rez)
        },
        err => {
          console.log('eroare: ', err);
        }
      )
  }

}
