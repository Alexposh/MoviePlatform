import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { NavigationPage } from '../models/navigation.page';

class Button{
  isFirst?:boolean;
  isLast?:boolean;
  isCurrent?:boolean;
  disabled?:boolean;
  label?:string;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() nrOfPages:any = 1; // numberOfPagesInGenre (Genre)
  nrOfItems: number = 1;
  @Input() currentPageNumber: any = 1; // pageNumberCurrent (Genre)
  @Output() evenimentulSchimbarePagina : EventEmitter<any> = new EventEmitter();

  displayedButtons:NavigationPage[]=[{
    isFirst:true,
    isLast:false,
    
    pageLabel:"1"
  },
  {
    isFirst:false,
    isLast:true,
    
    pageLabel:"2"
  }];

  
  // listing = functionRandom(nrOfPages,nrOfItems,displayedButtons)
  
  generatePA(n: number, numberOfPages: number): NavigationPage[] {
    let result: NavigationPage[] = [];

    let firstPage: NavigationPage = new NavigationPage();
    if (n > 2) {
      //
     
      firstPage.pageLabel = 'First Page';
      firstPage.pageNumber = 0;
      result.push(firstPage);

    } else {
      // firstPage.disabled = true;
    }
    // 
    for (let i = n - 2; i <= n + 2; i++) {
      if (i >= 0 && i <= numberOfPages) {
        let currentPage = new NavigationPage();
       
        if(i == n ){
          currentPage.isCurrent = true;
        }
        currentPage.pageLabel =  i == numberOfPages ? ( "Last Page [" + (numberOfPages+1)  + "]") :  ("" + (i+1));

        // currentPage.pageLabel =  i == 0 ? "First Page" : ("" + (i+1));
        currentPage.pageNumber = i;
        result.push(currentPage);
      }
    }
    if (n < numberOfPages - 2) {
      let lastPage = new NavigationPage();
      lastPage.pageLabel = 'Last Page [' + (numberOfPages+1) + ']';
      lastPage.pageNumber = numberOfPages;
      result.push(lastPage); // last page
    }
    return result;
  }


  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGES: ', changes);
    console.log('SOME CHANGE OCCURRED');
    console.log('CURRENT PAGE: ', this.currentPageNumber);
    console.log('TOTAL NUMBER OF PAGES: ', this.nrOfPages);
    if(changes['currentPageNumber']){
      this.currentPageNumber =  changes['currentPageNumber']['currentValue'];
    }
    if(changes['nrOfPages']){
      this.nrOfPages = changes['nrOfPages']['currentValue'];
    }
    this.displayedButtons = this.generatePA(this.currentPageNumber, this.nrOfPages);
  }

  ngOnInit(): void {
    // this.displayedButtons = this.generatePA(7, 30);
    // console.log('CURRENT PAGE: ', this.currentPageNumber);
    // console.log('TOTAL NUMBER OF PAGES: ', this.nrOfPages);
  }

  navigateToPage(page: any){
    console.log('navigating to: ', page);
    this.evenimentulSchimbarePagina.emit(page);
  }

}

