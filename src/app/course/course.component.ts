import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeptService } from '../dept.service';
import { CourseData } from '../Courses';
import { Observable, Subject, Subscription, filter, map, of } from 'rxjs';
import { find } from 'rxjs';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ViewChild,ElementRef } from '@angular/core';
import { ReturnStatement } from '@angular/compiler';

import { LowerCasePipe } from '@angular/common';



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
  searchTerm: string = '';
  
  Filter: any[] = [];

@ViewChild('Containerr') Containerr!:ElementRef
section: any;
 

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
    // Trigger search after 3 characters
    if (this.searchTerm.length < 2) {
      this.Filter = [];
      return;
    }

    const lowerCaseTopic = this.searchTerm.toLowerCase();

  
    this.Filter = this.content.filter((section: any) => {
      if (typeof section === 'object' && section.title) {
        return section.content.toLowerCase().includes(lowerCaseTopic);
      }
      return false;
    });

    // Scroll to the first matched section if any
    if (this.Filter.length > 0) {
      const matchedIndex = this.content.findIndex((section: any) => {
        return section.content.toLowerCase().includes(lowerCaseTopic);
      });

      if (matchedIndex !== -1) {
        const element = document.getElementById('section-' + matchedIndex);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
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
