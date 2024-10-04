import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './Environment';
import { Logs } from './LogDetails';
import { Env } from './Environment';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import{ SupabaseClient} from '@supabase/supabase-js';
import { createClient
 } from '@supabase/supabase-js';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
_ngRun=inject(NgZone)
private supaClient:SupabaseClient
router= inject(Router)
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


  constructor(private http:HttpClient) {

   }

   async signUp(){
    await this.supaClient.auth.signInWithOAuth({
      provider:'google'
    })
   }


async logIn(){
  await this.supaClient.auth.signOut()

}

get Functions():Boolean{
  let user = localStorage.getItem('session') as string
 return  user ===' undefine'? false:true

}

   
}
