import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:any={
    username:"",
    password:""
  }

  confirmedPassword:any={
    content:""
  };

  

  saveUser(){
    if(!this.user.password === this.confirmedPassword.content){
      // eroare
      return;
    }
    const url = 'http://localhost:8000/user-save';
    let bodyRequest = {
      username : this.user.username,
      password:this.user.password
    };
    return this.http.post<any>(url, bodyRequest, {headers:new HttpHeaders({
      "Content-Type":"application/json"
    })}).subscribe(
      user=>{
        console.log('raspunsul: ', user);
        this.loginService.set('AUTENTIFICARE', 'OK');
        this.loginService.set('ACCESS_TOKEN', user.newToken);
        // this.router.navigate(['/main']);
        // no token
        // this.loginService.loginServer(bodyRequest.username, bodyRequest.password)
        //   .subscribe(loginResult => {

        //   });
        // this.moviePoster = this.imagineBase64;
        console.log('contul salvat pentru userul : ',  user.username, ' cu parola ', user.password);
        this.user.password = "";
        this.confirmedPassword.content="";
      }
    );
  

  }
  constructor(private http:HttpClient, private loginService: LoginService) { }

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
    this.confirmedPassword= new FormGroup({
      confirmed: new FormControl(this.confirmedPassword, [
        Validators.required,
        Validators.minLength(8)
      ])
    })
  }

}
