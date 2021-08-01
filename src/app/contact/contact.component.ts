import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: [
              '../../assets/main/css/styles.css',
              './contact.component.css'
             ]
})
export class ContactComponent implements OnInit {
  

  contactForm:FormGroup;

 

  constructor() { }

  ngOnInit(): void {    

      this.contactForm = new FormGroup({
      emailAddress: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      name: new FormControl('', [
        Validators.required
      ]),
      phoneNumber: new FormControl('', [
        Validators.required      
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ])
    });  
  }

  onChange(updatedValue : string):void{

    console.log('UpdatedValue=',updatedValue);
    if (this.contactForm.valid)   
    { 
      console.log('valid form');
       
    }
    else
    {
      console.log('Invalid form');
       
    }

  }

  onSubmit(): void {
    // Process checkout data here
    
    console.warn('Your order has been submitted',this.contactForm.value);

    console.warn('getform=', this.contactForm.get('emailAddress').value);

    //this.contactForm.reset();
  }

}
