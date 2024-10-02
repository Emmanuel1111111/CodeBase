import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DeptService } from '../dept.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseData } from '../Courses';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit{
Data:any
value!:CourseData[]
Profile:any
Name=""
Info:any
pic:any

sanitizer=inject(DomSanitizer)
  ngOnInit(): void {
 this.route.paramMap.subscribe((data)=> this.Data=data.get('id'));

 this.Service.Profile(this.Data).subscribe({

next:(data)=>{
     this.Profile=data
     
}

 })
  
 this.courses.data().subscribe({
  next:(data)=>{
    this.value=data
   
  },
  error:(err)=>{
    err='Error while fetching course'
  }
 })
 
 console.log(this.Profile);
  console.log(this.Data)
 
 
 

  }


  Search(){
    this.courses.data().subscribe({
   next:(data)=>{
   const Id=data.find((x:any)=>x.name===this.Name )
   if(!Id){
    this.router.navigate(['error-comp'])
   }else{
   this.router.navigate(['course/:id',Id ])
   console.log(Id)
   }},
    error:(err)=>
      {
        document.write('Error occured')
      }
    })

  }


  constructor(private route: ActivatedRoute ,  private Service: AuthService,  private courses: DeptService , private router:Router,){

  }




}


