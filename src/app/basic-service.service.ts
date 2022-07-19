import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasicServiceService {

  constructor(private http: HttpClient) { }

getPeopleForPage(peopleJob:string, pageNumber: number, filtered: boolean): Observable<any> {
  let url = environment.serverContextPath+'/people-list-for-page/'+ pageNumber;
  const token = localStorage.getItem("ACCESS_TOKEN");
  return this.http.get<any[]>(url, {
    headers: new HttpHeaders({
      "PeopleJob": (peopleJob),
      "TokenPentruAcces": filtered ?  (token ? token : '') : '',
      "filtered": ''+filtered
    })
});
}


getPeopleCount(peopleJob:string, filtered: boolean): Observable<any>{
  const url : string = environment.serverContextPath+'/people-count';
  const token = localStorage.getItem("ACCESS_TOKEN");
  return this.http.get<any>(url, {
    headers: new HttpHeaders({
      "PeopleJob": (peopleJob),
      "TokenPentruAcces": filtered ? (token ? token : '') : '',
      "filtered": ''+filtered
      })
  });
}




}
