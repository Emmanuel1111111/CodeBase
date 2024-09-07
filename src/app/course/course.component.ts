import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeptService } from '../dept.service';
import { CourseData } from '../Courses';
import { Observable, Subject, Subscription, filter, map, of } from 'rxjs';
import { find } from 'rxjs';
import { block, marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ViewChild,ElementRef } from '@angular/core';
import { ReturnStatement } from '@angular/compiler';
import { log } from '@tensorflow/tfjs';



@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
   
  content:any;
  courseId: any;
  value: any
 Info!: any;
  coursename: any
  name!:'SafeHtml'
  contain:any
Topic=""
Filter=[]

@ViewChild('Containerr') Containerr!:ElementRef
 

  ngOnInit():void{
   this.activate.params.subscribe((data)=>{
  const courseId= +data['id']
  this.course.data().pipe(
    map((data:any)=>{
      return this.value= data.find((x:any)=> x.id===courseId)
    })
  ).subscribe({
    next: (data)=>{
      this.value=data
      this.content=data.lessons.day_2.sections
      this.Info= this.content.map((sections:{content:string})=>({
        ...sections,
        SafeContent: this.sanitizer.bypassSecurityTrustHtml(sections.content)


      }))
    }
  })

   })
   
  }


  OnSearch() {
    this.contain = this.Containerr.nativeElement
  
    this.Filter = this.content.filter((item: any) => {
      if (typeof item === 'object' && item.title) {
        return item.content.includes(this.Topic);
      } else if (typeof item === 'string') {
        return item.includes(this.Topic);
      } else {
        return false;
      }
    });
    
    if (this.Filter.length==0){
    return this.scrollToTop();
  }
}
  scrollToTop(){
    
    
    this.Containerr.nativeElement.scrollIntoView({behavior:'smooth'})
  }
 

  getMarked(content: any): any{
    return marked(content);
  }
 






  constructor(
    private activate: ActivatedRoute,
   private sanitizer:DomSanitizer,

    private course: DeptService
  ) { 

    
  }
}
