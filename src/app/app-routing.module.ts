import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { ErrorCompComponent } from './error-comp/error-comp.component';
import { LoginComponent } from './Singup/signUp.component';
import { CanActivateFn } from '@angular/router';
import { authGuard } from './auth.guard';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { NavbarComponent } from './navbar/navbar.component';




const routes: Routes = [
 {path:'', redirectTo :'login', pathMatch:'full'},
 {path:'home', component:HomeComponent, canActivate:[authGuard]},
 {path:'login', component:LoginComponent},
 {path: 'course/:id', component:CourseComponent, canActivate:[authGuard] },
 {path:'error-comp', component:ErrorCompComponent},
 {path:'userprofile/:id', component:UserprofileComponent ,canActivate:[authGuard]},
 {path:'navbar' , component:NavbarComponent}

 
 
 
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


