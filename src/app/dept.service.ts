import { Inject, Injectable, OnInit, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CourseData } from './Courses';
import { find } from 'rxjs';
import { environment } from './Environment';



@Injectable({
  providedIn: 'root'
})
export class DeptService implements OnInit {
  

items:any

url=environment.apiUrl
urls= "http://localhost:3000/api/courses"

coursename:any


GetUsers(userdetails:any):Observable<any>{
 return  this.http.get<any>(`${this.url}/users`,userdetails)
}

 
data():Observable<any>{
  return this.http.get<any>(`${this.urls}`).pipe(
    map((data)=>{
      this.items=data
      return this.items
    }),
     
    catchError((error)=>{
     
      console.log('Error while fetching course', error)
      return of([null])
    })
  )
 }
 Func():Observable<any>{
  return this.http.get<any>(`${this.urls}`).pipe(
    map((data)=>{
      this.items=data
      return this.items
    }),
     
    catchError((error)=>{
     
      console.log('Error while fetching course', error)
      return of([null])
    })
  )
 }
 constructor(private http:HttpClient){

 }
  ngOnInit(): void {
  
    



     
  }
 
}