import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-singleactor',
  templateUrl: './singleactor.component.html',
  styleUrls: ['./singleactor.component.css']
})
export class SingleactorComponent implements OnInit {

  artistInformation:any;
  moviesPlayedIn:any[]=[];
  moviesDirected:any[]=[];
  artistId:number=-1;
  numberOfMoviesPlayedIn:number= 0;
  numberOfMoviesDirected:number= 0;
  reactionAs: string = 'ACTOR';
  imagineBase64 : string | undefined = '';
  artistPhoto: any;

  // http://localhost:8000/save-reaction/actor/144

  // http://localhost:8000/save-reaction/114/director


  handleInputChange(event : any){
    console.log('input type file event: ', event);
    // event.target.files[0] -> 10101010101

    this.convertFile(event.target.files[0])
      .subscribe(rezultat => {
        console.log('rezultatul transformarii: ', rezultat);
        this.imagineBase64 = 'data:image/png;base64,'+rezultat;
        // this.textImagine = rezultat;
      })
  }

  convertFile(file : File) : Observable<string | undefined> {
    const result = new ReplaySubject<string | undefined>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file); 
    let toStringFisier = null;
    
    reader.onload = (event) => result.next(btoa(event?.target?.result?.toString() ? event?.target?.result?.toString() : '') );
    return result;
  }

  loadArtistData(artistId:number){
    const url = 'http://localhost:8000/artist-information/'+artistId;
    return this.http.get<any>(url).subscribe(
      dateArtist => {
       this.artistInformation = dateArtist;  
       console.log('am incarcat date pentru persoana ',this.artistInformation.person_id );          
        }
    );
  }

  saveImage(id:number){
    const url = 'http://localhost:8000/artist-image-save';
    let bodyRequest = {
      id : this.artistId,
      content:this.imagineBase64
    };
    return this.http.post<any>(url, bodyRequest, {headers:new HttpHeaders({
      "Content-Type":"application/json"
    })}).subscribe(
      textImagine=>{
        // this.moviePoster = this.imagineBase64;
        console.log('poza incarcata pentru persoana cu id: ',  textImagine);
        this.artistPhoto = bodyRequest.content;
      }
    );


  }

  loadImage(id:number){
    const url = 'http://localhost:8000/artist-image-load/'+id;
  
    return this.http.get<any>(url).subscribe(
      existImagine=>{
        this.artistPhoto = existImagine.content;
        console.log('avem imaginea incarcata pentru persoana cu id: ',  existImagine.person_id);
        console.log('imaginea base64: ', existImagine.content);
        console.log('test: ', existImagine);
      }
    );
  }

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
      this.loadImage(this.artistId);
      this.loadMoviesPlayedIn( this.artistId);
      this.loadMoviesDirected(this.artistId);
      this.loadArtistData(this.artistId);
      this.loadImage(this.artistId);
      console.log('artist ID incarcat: ',this.artistInformation);
      // console.log('he directed these movies: ',this.moviesDirected);
    });
  }

}
