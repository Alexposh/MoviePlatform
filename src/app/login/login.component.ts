import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

/** A hero's name can't match the given regular expression */
export function forbiddenValueValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

export function noProfanityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const profanities: string[] = ["dick", 'fuck'];
    for (let profanity of profanities) {
      if (control.value.includes(profanity)) {
        return { forbiddenProfanity: { value: control.value } };
      }
    }
    // const forbidden = nameRe.test(control.value);
    // return forbidden ? {forbiddenName: {value: control.value}} : null;
    return null;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {
    username: "",
    password: ""
  }

  loginForm: FormGroup = new FormGroup({});
  error: any = {
    text: "",
    value: false
  }

  loginFailed: boolean = false;


  login() {
    // console.log("log in")
    // const url = 'http://localhost:8000/login';


    // let body = {
    //   username: this.user.username,
    //   password: this.user.password
    // };
    // return;

    // this.http.post<any>(url, body).subscribe(rez=> {});

    if (this.user.username == "wrong" || this.user.password == "pass") {
      this.error.value = true;
      this.error.text = "your input is not valid";
    } else {
      this.loginService.loginServer(this.user.username, this.user.password)
        .subscribe(rez => {
          // console.log('logged in server response: ', rez);
          if (rez != false) {
            this.isLoggedIn = rez.statusLogin;
            if (rez.statusLogin) {
              // localStorage.setItem('AUTENTIFICARE', 'OK');
              // localStorage.setItem('ACCESS_TOKEN', rez.access_token)
              this.loginService.set('AUTENTIFICARE', 'OK');
              this.loginService.set('ACCESS_TOKEN', rez.access_token);
              this.router.navigate(['/main']);
            } else {
              localStorage.setItem('AUTENTIFICARE', 'FAIL');
              this.loginFailed = true;
            }
          }
        }
        );
    }
  }
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {

    // this.user = new FormGroup({
    //   name: new FormControl(this.user.username, [
    //     Validators.required,
    //     Validators.minLength(4),

    //   ]),
    //   password: new FormControl(this.user.password, [
    //     Validators.required,
    //     Validators.minLength(8)

    //   ])
    // });
    this.loginForm = new FormGroup({
      username: new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(4),
        forbiddenValueValidator(/wrong/i), // <-- Here's how you pass in the custom validator.
        forbiddenValueValidator(/\s/i),
        noProfanityValidator()
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(4),
        forbiddenValueValidator(/pass/i) // <-- Here's how you pass in the custom validator.
      ])
    });

    // this.loginForm.get('username').errors;
  }

  get username(): FormControl {
    // return this.loginForm.get('username');
    let formControlUsername = this.loginForm.get('username') as FormControl;
    return formControlUsername ? formControlUsername : new FormControl({});

  }
}

  // headerExperiments(){
  //   console.log('doing me some headers');
  //   fetch('http://localhost:8000/test-headers', {
  //     method: 'GET',
  //     headers: {
  //       'Mancare': 'Shaorma fetch'
  //     }
  //   })
  //     .then(date=>date.json())
  //     .then(date => {
  //       console.log('test header endpoint php zice: ', date);
  //     })
  // }

// }


