import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  env = environment

  user:User;

  constructor(private httpService: HttpClient) { }

  login(user): Observable<any>{
    return this.httpService.post<any>(this.env.apiUrl + 'auth/login',  user) 
  }

  setUser(user){
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User{
    return JSON.parse( localStorage.getItem('user'));
  }
}
