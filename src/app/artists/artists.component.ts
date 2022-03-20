import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  pageNumberCurent: any = 0;
  nrOfActors: number = -1;
  numberOfPages: number = -1;
  pagesBefore: number[] = [];
  pagesAfter: number[] = [];

  constructor(private http: HttpClient) { }

  allactors: any[] = [
  ];

  dateIncarcatePePagini: Map<number, any[]> = new Map<number, any[]>();
  featuredArtist: any[] = [];

  navigate(type: string) {
    console.log('Type of navigation: ', type);
    console.log('datele deja incarcate: ', this.dateIncarcatePePagini);

    if (type == 'prev') {
      
      this.pageNumberCurent--;
      
      this.loadActorsForPage(this.pageNumberCurent);
      
    } else if (type == 'next') {
      this.pageNumberCurent++;

      console.log('OBJECT KEYS: ', Object.keys(this.dateIncarcatePePagini));
      
      this.loadActorsForPage(this.pageNumberCurent);
     

    }
  }
 
  loadActorsForPage(pageNumber: number) {
    const url = 'http://localhost:8000/actors-list/' + pageNumber;


    let dacaExistaDeja = this.dateIncarcatePePagini.has(pageNumber);
    console.log('daca exista deja: ', dacaExistaDeja);
    if (dacaExistaDeja) {       
      this.allactors = this.dateIncarcatePePagini.get(pageNumber) || [];
    } else {
      this.http.get<any[]>(url).subscribe(
        listaActori => {
          this.allactors = listaActori;
          console.log(this.allactors);
          this.dateIncarcatePePagini.set(pageNumber, listaActori);
        }
      );
    }
  }

  loadActors() {
    const url = 'http://localhost:8000/actors-list/' + this.pageNumberCurent;
    return this.http.get<any[]>(url).subscribe(
      listaActori => {

        this.allactors = this.allactors.concat(listaActori);
         console.log(this.allactors);
         this.dateIncarcatePePagini.set(this.pageNumberCurent, listaActori);

      }
    );
  }

  navigateToPage(page: number) {
    console.log('navigating to page: ', page);
    this.pageNumberCurent = page;
    this.loadActorsForPage(this.pageNumberCurent);
  }

  navigateLast() {
    this.pageNumberCurent = this.numberOfPages;
    this.loadActorsForPage(this.pageNumberCurent);
  }

  navigateFirst() {
    this.pageNumberCurent = 0;
    this.loadActorsForPage(this.pageNumberCurent);
  }

  changePage(page:any){
    this.navigateToPage(page);
  }

  ngOnInit(): void {

    this.http.get<any>('http://localhost:8000/actors-count')
      .subscribe(
        rez => {
          console.log('rezultat nr of actors: ', rez);
          this.nrOfActors = rez.nr_actors;
          this.numberOfPages = Math.floor(this.nrOfActors / 4) + (this.nrOfActors % 4 != 0 ? 1 : 0) - 1;
        
        }
      );

    this.loadActors();
        
  }

}
