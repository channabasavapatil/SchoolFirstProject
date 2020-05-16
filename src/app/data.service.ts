import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { userInfo } from './signup/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  result: any;
  constructor(private http: HttpClient) { }
  getusers() {
    return this.http.get('http://localhost:3000/api/users').pipe(map((res: any) => this.result = res.data));
   }
   getTabs() {
    return this.http.get('http://localhost:3000/api/Tabs').pipe(map((res: any) => this.result = res.data));
   }
   getSchoolName() {
    return this.http.get('http://localhost:3000/api/SchoolName').pipe(map((res: any) => this.result = res.data));
   }
   getUserName(someid: number) {
    return this.http.get('http://localhost:3000/api/UserName/' + someid).pipe(map((res: any) => this.result = res.data));
   }
   InsertUser(Data: any): Observable <any>  {
     return this.http.post('http://localhost:3000/api/InsertNew', Data)
     .pipe();
   }
   getoneusers(id: number) {
        return this.http.get('http://localhost:3000/api/individualuser/' + id).pipe(map((res: any) => this.result = res.data));
   }
   CreatUser(Details: userInfo): Observable <any> {
    console.log(Details);
    return this.http.post('http://localhost:3000/api/InsertNewUser', Details).pipe();
    // console.log(this.http.post('http://localhost:3000/api/NewUser', Details).pipe());
   }
   LoginUser(Details: userInfo) {
    console.log(Details);
    this.http.post<{message: string}>('http://localhost:3000/api/Login', Details).subscribe( res => {
      console.log(res.message);
    }, err => {
      console.log(err);
    }, () => {
      console.log('Done');
    })
    // console.log(this.http.post('http://localhost:3000/api/NewUser', Details).pipe());
   }
}
