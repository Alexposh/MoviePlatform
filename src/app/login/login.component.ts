import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:any={
    username:"",
    password:""
  }
  
  
  login(){
    console.log("log in")
    const url = 'http://localhost:8000/login';

    
    let body = {
      username: this.user.username,
      password: this.user.password
    };
    // return;
    this.http.post<any>(url, body)
      .subscribe(rez => {
        console.log('logged in server response: ', rez);
        if(rez != false){
          this.isLoggedIn = rez.statusLogin;
          if(rez.statusLogin){
            localStorage.setItem('AUTENTIFICARE', 'OK');
            localStorage.setItem('ACCESS_TOKEN', rez.access_token)
          }else{
            localStorage.setItem('AUTENTIFICARE', 'FAIL');
          }
        }
      });
  }

  isLoggedIn: boolean = false;
  
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    
      this.user = new FormGroup({
        name: new FormControl(this.user.username, [
          Validators.required,
          Validators.minLength(4),
          
        ]),
        password: new FormControl(this.user.password, [
          Validators.required,
          Validators.minLength(8)
          
        ])
      });
      
    
    
  }

}


