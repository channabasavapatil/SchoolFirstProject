import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { userInfo } from './signup/UserInfo';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient ) { }
  // CreatUser(Details: any): Observable<any> {
  //   console.log(Details);
  //   return this.http.post('http://localhost:3000/api/NewUser', Details).pipe();
  // }
}
