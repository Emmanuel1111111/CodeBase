import { Inject, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button'
import{HttpClientModule} from '@angular/common/http'
import { DeptService } from './dept.service';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input'
import  { MatIcon, MatIconModule} from '@angular/material/icon'
import { MatButton } from '@angular/material/button'
import { MatInput } from '@angular/material/input';
import {MatRadioModule } from'@angular/material/radio'
import {MatCard, MatCardActions, MatCardModule} from '@angular/material/card'
import { MatError } from '@angular/material/form-field';
import {MatTabGroup} from '@angular/material/tabs'
import { MatTab } from '@angular/material/tabs';
import { ErrorCompComponent } from './error-comp/error-comp.component';
import { CommonModule } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { NativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import{MatMomentDateModule} from '@angular/material-moment-adapter'
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from './Singup/signUp.component';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatDatepicker } from '@angular/material/datepicker';
import { SingUpComponent } from './logIn/login.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatList, MatListModule, MatNavList } from '@angular/material/list';
import { NavbarComponent } from './navbar/navbar.component';
import { SafeHtmlPipe } from 'src/HtmlPipe';










@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  CourseComponent,
  ErrorCompComponent,
LoginComponent,
SingUpComponent,
UserprofileComponent,
NavbarComponent,
SafeHtmlPipe

 
 

   
   
  
  ],

  imports: [
MatListModule,
MatCardModule,
MatSidenavModule,
MatToolbarModule,
MatInputModule,
BrowserModule,
  AppRoutingModule,
  FormsModule,
  MatButtonModule,
  HttpClientModule,
  BrowserAnimationsModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  RouterModule,
  NativeDateModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  RouterModule,
  MatTabsModule,
  MatDatepickerModule,
MatMomentDateModule,

  
   
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  

  
 }
