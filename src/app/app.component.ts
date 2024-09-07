import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit {
 
  ngOnInit(): void {
   
    
    

    
  }
  ngAfterViewInit(): void {
  // const Component=this.vr.createComponent(ViewComComponent)
   // const componentRef= this. vcr.createComponent(RoomlistComponent)
    
   
  }


  constructor( ) {
    

  }
 
  

  title = 'Hotel';
rooms: any;
Data:any
User=""
question: any;




// @ViewChild('var', {read:ViewContainerRef}) vcr!:ViewContainerRef
//@ViewChild('child', {read:ViewContainerRef}) vr!:ViewContainerRef


}

