import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './Environment';
import { Logs } from './LogDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

url=environment.apiUrl
formdata!:Logs[]
SignUp(formdata:any):Observable<any>{
return   this.http.post<any>(`${this.url}/register`,formdata)

}

isLoggedIn():Boolean{
  return !!localStorage.getItem('authToken')

}

Login(data:any):Observable<any>{
  return this.http.post<any>(`${this.url}/login`, data)

}

Profile(id:number):Observable<any>{
  return this.http.get(`${this.url}/users/ ${id}`)
}



  constructor(private http:HttpClient) { }
}
