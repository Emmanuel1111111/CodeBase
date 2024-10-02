import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeptService } from '../dept.service';
import { AuthService } from '../auth.service';
import { Token, TokenType } from '@angular/compiler';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css'],
})
export class LoginComponent {
  profile = this.formbuilder.group({
    username: ['', [Validators.required]],
    Email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.maxLength(20), Validators.minLength(10)],
    ],
    DOB: ['', Validators.required],
  });

  singIn = this.formbuilder.group({
    username: ['', [Validators.required]],
    password: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(20)],
    ],
  });
  router = inject(Router);
  Name = '';
  errorMessage: any;
  err: any;

  async signUpWithGoogle(){
await this.Data.signUp()
  }

  SignUp() {
    if (this.profile.valid) {
      this.Data.SignUp(this.profile.value).subscribe({
        next: (data) => {
          const Id = data.id;
          const token = data.authToken;
          localStorage.setItem('id', Id);
          localStorage.setItem('authToken', token);
          this.router.navigate(['userprofile', Id]);
          this.profile.reset()
        },

        error: (err) => {
          this.err = 'Email is already in use';
        },
      });
    } else {
    }
  }

  Login() {
    this.Data.Login(this.singIn.value).subscribe({
      next: (data) => {
        const token = data.authToken;
        if (token) {
          const Id = data.id;
          localStorage.setItem('authToken', token);
          localStorage.setItem('id', Id);
          this.router.navigate(['userprofile', Id]);
          console.log(token);
          this.singIn.reset()
        } else {
          this.router.navigate(['login']);
        }
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Invalid Username or password';
      },
    });
  }

  Search() {
    if (this.profile.valid) {
      this.service.Func().subscribe({
        next: (data) => {
          const name = data.find((x: any) => x.name === this.Name);
          if (!name) {
            this.router.navigate(['error-comp']);
          } else {
            this.router.navigate(['course/:id', name]);
          }
        },

        error: (error) => {
          this.err = `${'Course not found'} ${error}`;
          this.router.navigate(['error-comp']);
        },
      });
    } else {
      this.profile.markAllAsTouched();
    }
  }



  constructor(
    private formbuilder: FormBuilder,
    private Data: AuthService,
    private service: DeptService
  ) {}
}
