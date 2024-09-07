import { Component, EventEmitter, OnInit } from '@angular/core';
import { DeptService } from '../dept.service';
import { CourseData } from '../Courses';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { query } from '@angular/animations';
import { Router } from '@angular/router';
import { ErrorNotification } from 'rxjs';
import { ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorCompComponent } from '../error-comp/error-comp.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
error!:ErrorHandler
isPremium=true
edit=true
formdata:any
free=true

  ngOnInit(): void {


    this.Data.Func().subscribe((data)=>
      this.Info=data
    
    );
   
  }
  courseinfo: any;
  me: any;
  subscription!: Subscription;
  Name:any
  Info: CourseData[] = [];
  courseId: any;
  err:any
  
  Search(){

  this.Data.Func().pipe(
     
      catchError((error)=>{
    this.router.navigate(['error-comp',error])
    return of([null])
     

   } )
  ).subscribe({
    next:(data)=>{
      if(data){
       const Id= data.find((x:any)=> x.name===this.Name)
       this.router.navigate(['course/:id', Id])

      }else{

        this.router.navigate(['login'])
      }
    },

    error: (error)=>{
      
     this. err=error
    }
   
    })
   
  
  }




  
  

  constructor(
    private Data: DeptService,
    private router: Router,
    private get: ActivatedRoute
  ) {



  
  }
}