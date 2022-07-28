import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from 'src/environments/environment';
import { MatCarouselModule } from '@ngmodule/material-carousel';


@Component({
  selector: 'app-singlemovie',
  templateUrl: './singlemovie.component.html',
  styleUrls: ['./singlemovie.component.css']
})
export class SinglemovieComponent implements OnInit {


  // @Input() id : number;
  idCurrentMovie : number = -1;
  featuredMovie:any;
  cast_members:any[]=[];
  movie_crew:any[]=[];
  castShown:boolean=false;
  moviePoster: any;
  moviePhotos:any[] = [];
  possibleOpinions:any[]=[];
  opinionSelected:string = "";

  imagineBase64 : string | undefined = '';
  textImagine:string | undefined="";

   constructor(private http:HttpClient, private activatedRoute : ActivatedRoute) { }

   loadSingleMovie(id:number){
    const url = environment.serverContextPath +'/movie-item/'+id;
    return this.http.get<any>(url).subscribe(
      selectedMovie=>{
        this.featuredMovie = selectedMovie;
        console.log('movie: ', this.featuredMovie);
        }
    );
  }

  loadCast(id:number){
    const url = environment.serverContextPath +'/movie-cast/'+id;
    return this.http.get<any>(url).subscribe(
      movieCast=>{
        this.cast_members = movieCast;
        console.log('cast: ', movieCast);
      }
    );
  }

  afterOpinionSelect() {
    console.log("selected: " + this.opinionSelected);
    
    
    
  }

  getPossibleOpinions(){
    const url = environment.serverContextPath +'/possible-opinions';
    return this.http.get<any>(url).subscribe(
      foundOpinions=>{
        this.possibleOpinions = foundOpinions;
        console.log('opinions: ', foundOpinions);
      }
    );
  }

  saveOpinion(id:number){
    console.log("this should save the opinion to database");
    const url =environment.serverContextPath + "/opinion-send";
    const token = localStorage.getItem("ACCESS_TOKEN");
    console.log('token: ', token);
    let postBody = {
      id: id,
      opinionSent: this.opinionSelected
    };
    this.http.post<any>(url,postBody, {headers:new HttpHeaders({
      "Content-Type":"application/json",
      
      "TokenPentruAcces": (token ? token : '')      
    })}).subscribe(
      IdOfMovieOpinion=>{
        // this.moviePoster = this.imagineBase64;
        console.log('opinia salvata pentru userul cu id: ',  IdOfMovieOpinion.idUser);
      }
    );
  }

  loadCrew(id:number){
    const url = environment.serverContextPath +'/movie-crew/'+id;
    // const url = 'http://localhost:8000/movie-crew/'+id + '?access_token=' + localStorage.getItem('ACCESS_TOKEN');
    return this.http.get<any>(url).subscribe(
      movieCrew=>{
        this.movie_crew = movieCrew;
        console.log('crew: ', movieCrew);
      }
    );
  }


  // SELECT * FROM movie_crew INNER JOIN person ON movie_crew.person_id=person.person_id where movie_id = :id and job="Director";
  hideCast(){
    this.castShown=false;
    console.log("this should hide the cast");
  }
  showCast(){
    this.castShown=true;
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(x => {
      console.log('x = ', x);
      this.idCurrentMovie = x['id-movie']; // x.id-movie
      console.log('ID MOVIE CURENT: ', this.idCurrentMovie);
      this.loadSingleMovie(this.idCurrentMovie);
      this.loadCast(this.idCurrentMovie);
      this.loadCrew(this.idCurrentMovie);
      this.loadImage(this.idCurrentMovie);
      this.loadCarouselImages(this.idCurrentMovie);
      this.getPossibleOpinions();
    });


    
   
  }

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

  storePhoto(id:number){
    console.log("save the photo: " + this.imagineBase64);
    const url = environment.serverContextPath +'/movie-image/'+id;
    return this.http.post<any>(url, id, {headers:new HttpHeaders({
      "Content-Type":"application/json"
    })}).subscribe(
      textImagine=>{
        
        console.log("incarca imaginea"); //+ 'imaginea incarcata: ' + this.imagineBase64);
      }
    );
  }

  saveImage(id:number){
    const url = environment.serverContextPath +'/movie-image-save';
    let bodyRequest = {
      id : id,
      content:this.imagineBase64
    };
    return this.http.post<any>(url, bodyRequest, {headers:new HttpHeaders({
      "Content-Type":"application/json"
    })}).subscribe(
      textImagine=>{
        // this.moviePoster = this.imagineBase64;
        console.log('imaginea incarcata pentru filmul cu id: ',  textImagine);
        this.moviePoster = bodyRequest.content;
      }
    );


  }

  saveCarouselImage(id:number){
    const url = environment.serverContextPath +'/movie-carousel-image-save';
    let bodyRequest = {
      id : id,
      content:this.imagineBase64
    };
    return this.http.post<any>(url, bodyRequest, {headers:new HttpHeaders({
      "Content-Type":"application/json"
    })}).subscribe(
      IdFilmPhotoAdded=>{
        // this.moviePoster = this.imagineBase64;
        console.log('imaginea incarcata in carousel pentru filmul cu id: ',  IdFilmPhotoAdded);
      }
    );
  }

  
  loadImage(id:number){
 
    const url = environment.serverContextPath +'/movie-image-load/'+id;
  
    return this.http.get<any>(url).subscribe(
      existImagine=>{
        this.moviePoster = existImagine.contents;
        console.log('avem imaginea incarcata pentru filmul cu id: ',  existImagine.id);
        console.log('imaginea base64: ', existImagine.contents);
        console.log('test: ', existImagine);
      }
    );
  }


  loadCarouselImages(id:number){
 
    const url = environment.serverContextPath +'/movie-carousel-load/'+id;
  
    return this.http.get<any>(url).subscribe(
      carouselImages=>{
        this.moviePhotos = carouselImages;
        for(let image of carouselImages){
          console.log("imaginea cu id: "+ image.id +" pentru filmul cu id: "+image.movie_id);
        }
        
        
      }
    );
  }
}
