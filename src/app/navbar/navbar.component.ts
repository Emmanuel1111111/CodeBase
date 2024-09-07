import { Component, OnInit } from '@angular/core';
import { DeptService } from '../dept.service';
import { AuthService } from '../auth.service';
import { ViewChild } from '@angular/core';
import { SingUpComponent } from '../logIn/login.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  id: any
  ngOnInit(): void {
    this.id = localStorage.getItem('id')



  }

  clear(): void {
   localStorage.clear()



  }

}
