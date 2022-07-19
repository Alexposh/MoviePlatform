import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMoviesForPage(categoryId:number, pageNumber:number):Observable<any>{
    const url = environment.serverContextPath + '/movies-in-genre-by-genre-id-extra-details/' + (categoryId ? categoryId : '-1') + '/' + pageNumber;
    return this.http.get<any>(url
      //   ,{
      //   headers: new HttpHeaders({
      //     "genre": this.category
          
      //   })
      // }
      )
  }

}
