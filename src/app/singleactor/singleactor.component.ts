import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singleactor',
  templateUrl: './singleactor.component.html',
  styleUrls: ['./singleactor.component.css']
})
export class SingleactorComponent implements OnInit {

  moviesPlayedIn:any[]=[];
  actorId:number=-1;

  loadMoviesPlayedIn(actorId:number) {
    const url = 'http://localhost:8000/all-movies-one-actor/'+actorId;
    return this.http.get<any[]>(url).subscribe(
      listaFilmeForActor => {

        this.moviesPlayedIn = this.moviesPlayedIn.concat(listaFilmeForActor);
         console.log(this.moviesPlayedIn);
         
      }
    );
  }

  constructor(private http:HttpClient, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x => {
      console.log('actor selected = ', x);
      this.actorId = x['person-id']; 
      this.loadMoviesPlayedIn(this.actorId);
    });
  }

}
