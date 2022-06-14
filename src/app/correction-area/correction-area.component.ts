import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-correction-area',
  templateUrl: './correction-area.component.html',
  styleUrls: ['./correction-area.component.css']
})
export class CorrectionAreaComponent implements OnInit {

  weirdNames:any[] = [];
  numberOfWeirdNames:any[] = [];
  constructor(private http: HttpClient) { }

  loadWeirdNames() {
    const url = 'http://localhost:8000/weird-names';
    return this.http.get<any[]>(url).subscribe( 
      listaActori => {
        // listaActori.forEach(nameFound => {
        //   console.log(this.weirdNames+" at the beggining")
        //   if(nameFound.person_name.indexOf('\\u0') !== -1) {
        //       this.weirdNames.concat(nameFound);
        //       console.log(nameFound.person_name.indexOf('\\'));
        //   }
        //   console.log(nameFound);
        //   console.log(nameFound.person_name.indexOf('\\'));
          
        // });
        this.weirdNames = this.weirdNames.concat(listaActori);
        console.log(this.weirdNames+" at the end");
        console.log(listaActori);
      }
    );
    
  }

  countWeirdNames(){
    const url = 'http://localhost:8000/count-weird-names';
    return this.http.get<any[]>(url).subscribe(
      numberOfWeirdNamesReturned => {
        this.numberOfWeirdNames = numberOfWeirdNamesReturned;
        console.log('we have '+this.numberOfWeirdNames+' weird names');
      }
    );
  }

  fixSingleName(id:number, name:string){

        let startOfUnicode: number = name.indexOf('u0');
        let firstPart = name.slice(0,startOfUnicode);
        let secondPart = name.slice(startOfUnicode)
        console.log(firstPart," ",secondPart);
        let newName=firstPart+"\\"+secondPart;
        console.log(newName);

    const url = 'http://localhost:8000/fix-single-name';
    let body = {
      id: id,
      newName: newName
    };
    this.http.post<any>(url, body).subscribe(raspuns => {
      console.log('persoana updated: ', raspuns);
    });

  }

  altaFunctie(){
    let unRezultat = this.functie();
    console.log('rezultatul tau: ', unRezultat);
  }

  functie(){
    // let sir = 'hello';
    let dupaTimp = setTimeout(() => {
      console.log('a trecut o secunda si acum returnez!!!!');
      return 'SHAORMA';
    }, 1000);
    // return sir;
    return 'PIZZA';
  }

  fixAllnames(){
    const url = 'http://localhost:8000/fix-all-weird-names';    
    this.http.get<any>(url).subscribe(
      rez => {
        console.log('rezultat ok: ', rez);
        this.loadWeirdNames();
        this.countWeirdNames();
      },
      err => {
        console.log('eroare: ', err);
      }
     );
    
  }

  fixWeirdName(name:string){
        // let numberInName : number = -1;
        let startOfUnicode: number = name.indexOf('u0');
        let unicode = name.slice(startOfUnicode,startOfUnicode+5);
        // console.log(startOfUnicode);
        // console.log(name.slice(startOfUnicode,startOfUnicode+5));
        // /\d/
        // /(\d+)/

        
    // if(numberInName){
    //   console.log("we should correct "+name); 
    //   console.log(numberInName);
    //   let positionOfNumber  = numberInName.index;
    // console.log(name.slice(,positionOfNumber));
    
    // console.log(name.slice(0,positionOfNumber)+'\\'+name.slice(positionOfNumber))
    //console.log(parseInt(positionOfNumber));

    // } else{
    //   console.log("no correction needed for "+name);
    // }

    const url = 'http://localhost:8000/get-all-one-unicode/'+unicode;    


    // return  this.http.get<any>(url);

    return this.http.get<any>(url).subscribe(
      oneUnicodeAllNames=>{
        // this.moviePoster = this.imagineBase64;
        console.log('all people for unicode : ',unicode,': ',oneUnicodeAllNames);
        console.log("before individual update");
        oneUnicodeAllNames.forEach((singlePerson: { person_id: number; person_name: string; }) => {
          this.fixSingleName(singlePerson.person_id,singlePerson.person_name);
          
        });
        console.log("after individual update");
      }
    );

    
  }
  

  ngOnInit(): void {
    this.loadWeirdNames();
    this.countWeirdNames();
  }

}
