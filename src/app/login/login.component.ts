import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

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
    console.log('login clicked!', this.loginForm.get('email').value);
  }

 
  ngOnDestroy():void {
    console.log('login destroy');
  }

}
