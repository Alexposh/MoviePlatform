import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasicServiceService } from '../basic-service.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  
  @Input() peopleJob :string = "";
  allPeople:any[]=[];
  allPeopleOnPage:any[]=[];  
  @Output() evenimentulSchimbarePagina : EventEmitter<any> = new EventEmitter();
  @Input() nrOfPages:any = 1;
  @Input() filtered: boolean = false;

  pageNumberCurent: any = 0;
  numberOfPages: number = -1;
  nrOfPeople: number = -1;
  dateIncarcatePePagini: Map<number, any[]> = new Map<number, any[]>();

  
  // let basicService = new BasicServiceService();
  constructor(private http: HttpClient, private basicService: BasicServiceService) { }
  changePage(page:any){
    this.navigateToPage(page);
  }

  navigateToPage(page: number) {
    console.log('navigating to page: ', page);
    this.pageNumberCurent = page;
    this.loadPeopleForPage(this.peopleJob, this.pageNumberCurent);
  }

  loadPeopleForPage(peopleJob:string, pageNumber: number) { // add service - TO DO
    // const url = 'http://localhost:8000/people-list-for-page/' + pageNumber;
    // const token = localStorage.getItem("ACCESS_TOKEN");
    let dacaExistaDeja = this.dateIncarcatePePagini.has(pageNumber);
    // console.log('daca exista deja: ', dacaExistaDeja);
    if (dacaExistaDeja) {       
      this.allPeopleOnPage = this.dateIncarcatePePagini.get(pageNumber) || [];
      } else {
        // console.log('filtered: ', this.filtered);
      // this.http.get<any[]>(url, {
      //   headers: new HttpHeaders({
      //     "PeopleJob": (peopleJob),
      //     "TokenPentruAcces": this.filtered ?  (token ? token : '') : '',
      //     "filtered": ''+this.filtered
      //   })
      // }
      this.basicService.getPeopleForPage(peopleJob,pageNumber, this.filtered).subscribe(
        listaPeopleOnPage => {
          this.allPeopleOnPage = listaPeopleOnPage;
          this.allPeopleOnPage.forEach(person => {
            console.log('should load photo of person with id: ', person.person_name);
            const getPhotoUrl = "http://localhost:8000/artist-photo-load/" + person.person_id;
            this.http.get<any[]>(getPhotoUrl).subscribe(
              photoContents=>{
                person['photo']=photoContents;
              }
            ) 
            
          });
          console.log('persoane incarcate pe pagina: ',this.allPeopleOnPage);
          this.dateIncarcatePePagini.set(pageNumber, listaPeopleOnPage);
          
        }
      );
    }
  }

  // loadPeople(peopleJob:string) {
  //   const url = 'http://localhost:8000/people-list';
  //   const token = localStorage.getItem("ACCESS_TOKEN");
  //   console.log('filtered: ', this.filtered);
  //   return this.http.get<any[]>(url, {
  //     headers: new HttpHeaders({
  //       "PeopleJob": (peopleJob),
  //       "TokenPentruAcces":  this.filtered ? (token ? token : '') : ''
  //     })
  //   }).subscribe(
      
  //     listaPersoane => {
  //       this.allPeople = this.allPeople.concat(listaPersoane);        
  //     }
  //   );
  //   }

countPeople(peopleJob:string){
  // const url : string = 'http://localhost:8000/people-count';
  // const token = localStorage.getItem("ACCESS_TOKEN");
  // this.http.get<any>(url, {
  //   headers: new HttpHeaders({
  //     "PeopleJob": (peopleJob),
  //     "TokenPentruAcces": this.filtered ? (token ? token : '') : '',
  //     "filtered": ''+this.filtered
  //     })
  // })

  this.basicService.getPeopleCount(peopleJob, this.filtered)
  .subscribe(
    rez => {
      console.log('rezultat nr of people in total dupa count : ', rez);
      this.nrOfPeople = rez.nr_people;
      this.numberOfPages = Math.floor(this.nrOfPeople / 4) + (this.nrOfPeople % 4 != 0 ? 1 : 0) - 1;
    
    }
  );
}
  ngOnInit(): void {
    this.countPeople(this.peopleJob);
    this.loadPeopleForPage( this.peopleJob,this.pageNumberCurent);
}
}
