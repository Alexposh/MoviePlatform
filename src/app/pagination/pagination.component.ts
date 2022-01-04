import { Component, OnInit } from '@angular/core';
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
export class PaginationComponent implements OnInit {

  nrOfPages:number = 1;
  nrOfItems: number = 1;
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
  


  constructor() { }

  ngOnInit(): void {
  }

}

