import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singleactor',
  templateUrl: './singleactor.component.html',
  styleUrls: ['./singleactor.component.css']
})
export class SingleactorComponent implements OnInit {

  moviesPlayedIn:any[]=[];
  moviesDirected:any[]=[];
  artistId:number=-1;
  numberOfMoviesPlayedIn:number= 0;
  numberOfMoviesDirected:number= 0;
  reactionAs: string = 'ACTOR';

  // http://localhost:8000/save-reaction/actor/144

  // http://localhost:8000/save-reaction/114/director



  addAsLiked(type: string){
    const url = 'http://localhost:8000/save-reaction/'+type+'/'+this.artistId;
    let headers = new HttpHeaders();
    let currentToken = localStorage.getItem('ACCESS_TOKEN');
     headers = headers.set('TokenPentruAcces', currentToken != null ? currentToken : '');
    // let body = {
    //   nume: 'bob'
    // };
    this.http.post(url,{},{headers: headers}).subscribe(
      raspuns => {
        console.log('raspuns server: ', raspuns);
      }

    )

  }


  loadMoviesPlayedIn(artistId:number) {
    this.moviesPlayedIn = []; 
    const url = 'http://localhost:8000/all-movies-one-actor/'+artistId;
    return this.http.get<any[]>(url).subscribe(
      listaFilmeForActor => {

        this.moviesPlayedIn = this.moviesPlayedIn.concat(listaFilmeForActor);
         console.log('he played in these movies: ',this.moviesPlayedIn);
         this.numberOfMoviesPlayedIn= this.moviesPlayedIn.length;
         
      }
    );
  }
  
  loadMoviesDirected(artistId:number) {
    this.moviesDirected = []; 
    const url = 'http://localhost:8000/all-movies-one-director/'+artistId;
    return this.http.get<any[]>(url).subscribe(
      listaFilmeForDirector => {

        this.moviesDirected = this.moviesDirected.concat(listaFilmeForDirector);
         console.log('he directed these movies: ',this.moviesDirected);
         this.numberOfMoviesDirected= this.moviesDirected.length;
         
      }
    );
  }

  constructor(private http:HttpClient, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x => {
      console.log('actor selected = ', x);
      this.artistId = x['person-id']; 
      this.loadMoviesPlayedIn( this.artistId);
      this.loadMoviesDirected(this.artistId);
      // console.log('he played in these movies: ',this.moviesPlayedIn);
      // console.log('he directed these movies: ',this.moviesDirected);
    });
  }

}
