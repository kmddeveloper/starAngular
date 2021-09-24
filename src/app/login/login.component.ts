import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token/token.service';
import {  StateService } from 'src/app/core/services/state/state.service';
import { errorBase } from '../core/common/errorBase';
import { AuthResult } from '../core/models/AuthResult';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends errorBase implements OnInit {

  constructor(private httpService:HttpService, private router:Router,  
              private authService:AuthService, private tokenService: TokenService,
              private stateService:StateService) {
                super();
               }

  loginForm:FormGroup;


  //loginFormGroup = new FormGroup({
   // email: new FormControl('',[
   //   Validators.required,
   //   Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  //});

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      email: new FormControl('',[ 
       Validators.required,
       Validators.pattern(`^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`)]),
       password: new FormControl('',[ 
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")])
    });

    console.log('login loaded');
  }

  login(): void{
    let email:string = this.loginForm.get('email').value;
    let password:string = this.loginForm.get('password').value;
    console.log('calling auth');
    this.resetError();
    let loginSub = this.authService.auth(email,password).subscribe({
        next: data =>{       
            if (data){
              this.router.navigateByUrl('/home');
              console.log('authService.auth data=>', data);
            }
            else{
              console.log('authService.auth data else=>', data);
              this.setHttpErrorMessage(data);
              console.log('authService.auth data else message=>', this.error);
            }            
        },
        error: error => { 
           this.setHttpErrorMessage(error);
            console.log('authService.auth error=>', this.error);
          
        },
        complete: ()=> {
          console.log('authService.auth completed');          
        }
    });


/*

    let loginSub = this.authService.login(email,password).subscribe({

      next: session => {
          if (session && session.userId > 0){            

             let newTokenSub = this.tokenService.new(session.id).subscribe({
                next: token => {
                  console.log('creating token-session=', session);
                  console.log('creating token-sessionid=', session.id);
                  this.stateService.setState(session);   
                  this.tokenService.setToken(token.access_Token);
                  console.log('created token-session=', session);   
                  console.log('created token-session=', this.router);   
                  this.router.navigateByUrl('/home');
                },
                error: error => {
                    console.log("tokenService.new error", error);
                },
                complete: () => {
                  newTokenSub.unsubscribe();
                }
                
            });            
          }
      },
      error: error => {
        this.errorMessage = error;
        console.log('error message', error);
      },
      complete: ()=> {
        loginSub.unsubscribe();
      }

     }
    );

     */


    console.log('login clicked!', this.loginForm.get('email').value);
  }

 
  ngOnDestroy():void {
    console.log('login destroy');
  }

}
