import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

   constructor(private http:HttpClient, private activatedRoute : ActivatedRoute) { }

   loadSingleMovie(id:number){
    const url = 'http://localhost:8000/movie-item/'+id;
    return this.http.get<any>(url).subscribe(
      selectedMovie=>{
        this.featuredMovie = selectedMovie;
        console.log('movie: ', this.featuredMovie);
        }
    );
  }

  loadCast(id:number){
    const url = 'http://localhost:8000/movie-cast/'+id;
    return this.http.get<any>(url).subscribe(
      movieCast=>{
        this.cast_members = movieCast;
        console.log('cast: ', movieCast);
      }
    );
  }

  loadCrew(id:number){
    const url = 'http://localhost:8000/movie-crew/'+id;
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
    });
    
   
  }

}
