import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  localStorage: Storage;
  changes$ = new Subject();
  constructor(private http: HttpClient) {
    this.localStorage   = window.localStorage;
  }
  get(key: string): any {
    if (this.isLocalStorageSupported) {
      let element = this.localStorage.getItem(key) as any;
      return JSON.parse(element);
    }
    return null;
  }
  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, value);
      this.changes$.next({
        type: 'set',
        key,
        value
      });
      return true;
    }
    return false;
  }
  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      this.changes$.next({
        type: 'remove',
        key
      });
      return true;
    }
    return false;
  }
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }

  loginServer(username: string, password: string): Observable<any>{
    const url = 'http://localhost:8000/login';
    let body = {
      username: username,
      password: password
    };
    return this.http.post<any>(url, body);
  }
}
