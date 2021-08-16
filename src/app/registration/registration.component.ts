import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ValidatorService } from '../core/services/validator/validator.service';
import { RegistrationService } from '../core/services/registration/registration.service';
import { User } from '../core/models/User';
import { Router } from '@angular/router';
function customValidatorRange(c: AbstractControl): {[key:string]:boolean} |null{
  if (c.value !=null && (isNaN(c.value) || c.value < 1 || c.value > 5))
    return {'range':true};

    
    
  return null;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  errorMessage:null;

  registrationForm:FormGroup;

  

  constructor(private formBuilder:FormBuilder, 
              private validatorService:ValidatorService,
              private registrationService:RegistrationService,
              private router: Router) { }

  ngOnInit(): void {

    this.registrationForm = new FormGroup(
    {
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ]),
      email: new FormControl('',[ 
        Validators.required,
        Validators.email]),
      password: new FormControl('',[ 
        Validators.required,
        this.validatorService.patternValidator()]),

      confirmPassword: new FormControl('',[ 
        Validators.required,
        this.validatorService.patternValidator()])
      }
    );

    this.registrationForm = this.formBuilder.group(
        {
          firstName: ['', [Validators.required,  Validators.minLength(2)]],
          lastName: [{value:'', disabled: false}, [
            Validators.required,
            Validators.minLength(1)
          ]],
          email: ['',[ 
            Validators.required,
            Validators.email]],
          password: ['',[ 
            Validators.required,
            this.validatorService.patternValidator()]],
          confirmPassword: ['',[ 
            Validators.required,
            this.validatorService.patternValidator()]]
        },
        {
          validators: this.validatorService.MatchPassword('password', 'confirmPassword'),
        }
      )
    
    console.log('registration loaded');
  }
 
  get error(){
    return this.errorMessage;
  }

  get registrationFormControls(){
    return this.registrationForm.controls;
  }


  setValidatorsAtRuntime(formControlName:string){
    if (formControlName){
      let formControl = this.registrationForm.get(formControlName);

      if (formControlName==='email'){
        formControl.setValidators([Validators.required, Validators.email]);
      }
      else{
        formControl.clearValidators();
      }
      formControl.updateValueAndValidity(); //Call this so that the form will be re-evaluated.
    }

  }

  populateFormValue():void{
    this.registrationForm.setValue({
      firstName: 'Kevin',
      lastName: 'Young',      
      email: 'kmd888@gmail.com',
      password: '1234Abcd@'

    })
  }

  populatePartialValue():void{
    this.registrationForm.patchValue({
      firstName: 'Kevin',
      lastName: 'Young',   
    })      
  }


  ngOnDestroy():void{
    console.log('registration unloaded');
  }

  register():void{
    console.log('register click!');
    console.log(this.registrationForm.controls.email.value);
    console.log(this.registrationForm.controls.firstName.value);
    console.log(this.registrationForm.controls.lastName.value);
    console.log(this.registrationForm.controls.password.value);

    let user :  User = {
      email: this.registrationForm.controls.email.value,
      password: this.registrationForm.controls.password.value,
      firstName: this.registrationForm.controls.firstName.value,
      lastName: this.registrationForm.controls.lastName.value
    };
    let regSub = this.registrationService.register(user).subscribe({

      next: data => {
        if (data){
          this.router.navigateByUrl('/login');
        }
      },
      error: error => {
        this.errorMessage = error;
      },
      complete: ()=> {
        regSub.unsubscribe();
      }
    });
  }

}
