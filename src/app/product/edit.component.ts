import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownField } from 'src/app/core/models/DropDownField';
import { Product } from '../core/models/Product';
import { ProductEditItem } from '../core/models/ProductEditItem';
import { ProductService } from '../core/services/product/product.service';
import { errorBase } from '../core/common/errorBase';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent extends errorBase implements OnInit {

  editProductForm:FormGroup;
  productId: Number;

  productStatus:Array<DropdownField<Number,String>>;
  productCategory:Array<DropdownField<Number,String>>;

  constructor(private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute,
              private productService:ProductService, private router:Router) {
                super();
               }

  ngOnInit(): void {
    this.getItem();
    this.buildForm();    
  }

  buildForm(){
    this.editProductForm = this.formBuilder.group(
      {
        name: ['', [Validators.required,  Validators.minLength(2)]],
        description: [{value:'', disabled: false}, [
          Validators.required,
          Validators.minLength(1)
        ]],
        code: ['', [Validators.required, Validators.pattern(`^([A-Za-z]{3})+(?:-[0-9]{3})`)]],
        price: ['', [Validators.required,  Validators.minLength(2)]],
        image_url: ['', [Validators.required,  Validators.minLength(2)]],
        status: [0, [Validators.required]],
        note: ['', []],
        category:['', [Validators.required]],
      })
  }

  getItem(){
    this.resetError();
    var queryParams = this.activatedRoute.snapshot.queryParams;

    if (queryParams){
      let code = queryParams['code'];
      if (code){
        let prodSub = this.productService.getEditItem(code).subscribe({
            next: data => {  
              if (data)      
              {     
                if (data.error)
                {
                  this.error= data.error.message;
                }
                else{
                  this.setFormData(data.result);
                }
              }
            },
            error: error => {
              this.error = error;
              prodSub.unsubscribe();
            },
            complete: ()=> {
              prodSub.unsubscribe();
            }
        })
      }
    }
  }

  setFormData(data:ProductEditItem){
    this.productStatus = data.statusList;
    this.productCategory = data.categoryList;
    this.productId = data.id;
    let fields = ['status', 'category', 'name', 'description', 'code', 'price', 'image_url', 'note']    
    let values = [data.statusId, data.categoryId, data.name, data.description, data.code, data.price, data.imageUrl, data.note]

    if (fields.length == values.length){
       for(var x=0; x< fields.length; x++){
        this.setFormValue(fields[x], values[x]);
       }
    }
  }

  get formControls(){
    return this.editProductForm.controls;
  }

  setFormValue(key, value){
    this.formControls[key].setValue(value);
  }


  update(event){
    this.resetError();
    let product:Product = {
      name:this.formControls.name.value,
      id: this.productId,
      description: this.formControls.description.value,
      code: this.formControls.code.value,
      category: '',
      categoryId: this.formControls.category.value,
      note: this.formControls.note.value,
      statusId: this.formControls.status.value,
      price: this.formControls.price.value,
      imageUrl: this.formControls.image_url.value
    };

  
      let updateSub = this.productService.updateItem(product).subscribe({
        next: data => {
            if (data){
                if (data.error){
                    console.log('product updated Failed');
                    this.setErrorMessage(data.error.message); 
                }
                else{                
                  console.log('product updated Success');
                  this.router.navigateByUrl('/product/product?pagenum=1&pagesize=10&categoryid=1');
                }
            }
        },
        error: err => {
          console.log('product updated Error', err);
          console.log(err);
          
          this.setHttpErrorMessage(err);
          updateSub.unsubscribe();
        },
        complete: ()=> {
          console.log('complete');
          updateSub.unsubscribe();
        }

      })
 

    console.log('product', product);
    console.log('event', event);
  }

}
