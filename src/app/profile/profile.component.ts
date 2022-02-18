import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

likedMovies:Movie[]=[];
wishlistMovies:Movie[]=[];
hatedMovies:Movie[]=[];
userLoggedInId:number=-1;

identifyUser(){
  const url = 'http://localhost:8000/find-user/'+localStorage.getItem("ACCESS_TOKEN");
  this.http.get<any>(url).subscribe(
    userIdentified => {
      this.userLoggedInId=userIdentified;
      console.log(this.userLoggedInId);
    }
  );
  

}

getMoviesOpinions(user:number,opinion:number):void{
  
  console.log('loading movies for user '+ this.userLoggedInId);
   
  const url = 'http://localhost:8000/movies-opinions/'+ this.userLoggedInId + '/' + opinion;
 
    this.http.get<any>(url).subscribe(
      listaFilme => {
        if(opinion==1){
          this.likedMovies = listaFilme;
        }
        if(opinion==2){
          this.wishlistMovies = listaFilme;
        }
        if(opinion==3){
          this.hatedMovies = listaFilme;
        }
        
        console.log(this.likedMovies);
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
  }

}
