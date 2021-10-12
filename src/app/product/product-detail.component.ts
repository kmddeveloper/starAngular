//ng g c product/product-detail --flat

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../core/models/Product';
import { ProductService } from '../core/services/product/product.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';
import { Location } from '@angular/common';
import { ProductDetail} from 'src/app/core/models/ProductDetail';
import { ProductMapper} from './product-mapper';
import { NgxImgZoomService } from 'ngx-img-zoom';
import { ShoppingCartService } from '../core/services/shoppingCart/shopping-cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductColor } from "../core/models/ProductColor";
import { ProductSize } from '../core/models/ProductSize';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @ViewChild(SwiperComponent, { static: false }) compRef?:SwiperComponent;

  
  featureTab:string;
  specsTab:string;
  otherTab:string;

  featureContentTab:string;
  specsContentTab:string;
  otherContentTab:string;



  error:String;
  _product:Partial<Product>={};
  _productDetail:Partial<ProductDetail>={};
  _imageUrls:string[]=[];
  _loaded:boolean=false;
  availableColors:ProductColor[]=[];
  availableSizes:ProductSize[]=[];

  enableZoom: Boolean = true;

  shoppingForm:FormGroup;


  
  config: SwiperOptions = {
    
    pagination: { 
      el: '.swiper-pagination', 
      clickable: true ,      
    },
    
    loop:true,
    navigation: {
     nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    speed: 1000,
    autoplay: {
      delay: 2500
    },

  };  


  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute,
              private location:Location, private mapper:ProductMapper,
              private shoppingCartService:ShoppingCartService, private formBuilder:FormBuilder,
              private ngxImgZoom: NgxImgZoomService) {
                this.ngxImgZoom.setZoomBreakPoints([{w: 100, h: 100}, {w: 150, h: 150}, {w: 200, h: 200}, {w: 250, h: 250}, {w: 300, h: 300}]);
              }

  ngOnInit(): void {
    this.initTabs();
    this.initForm();
    this.getProduct();
  
  }

  initForm(){
    this.shoppingForm = this.formBuilder.group(
      {
          size:['0', [Validators.required, Validators.pattern(`^[1-9]`)]],
          color:['0', [Validators.required, Validators.pattern(`^[1-9]`)]],
          quantity:['1', [Validators.required, Validators.pattern(`^[1-9]`)]]
      }
    );
  }

  get loaded(){
    //if (this._productDetail && this._productDetail.product && this._productDetail.product.name && this._productDetail.product.name.length > 0)
    //  return true;
    //return false;
    return this._loaded;
  }

  get product(){
    return this._product;
  }

  get productDetail(){
    return this._productDetail;
  }

  get productImageUrls():string[]{
    return this._imageUrls;
  }


  buildImageUrls(){
    
    
    if (this._productDetail){
      
      console.log('INSIDE productimageurls product_images=',this._productDetail.product_images);
      if (this._productDetail.product_images){
        this._productDetail.product_images.forEach(element => {
          console.log('INSIDE ELEMENT=', element);
          if (element && element.imageUrl)
          this._imageUrls.push(element.imageUrl);
        });
      }     
    }
    if (this._imageUrls && this._imageUrls.length==0)this._imageUrls.push(this._productDetail.product.imageUrl)  
    
  }




  getProduct(){
    
    let queryParms = this.activatedRoute.snapshot.queryParams;

    if (queryParms)
    {
      let prodSub = this.productService.getProducDetailtByCode(queryParms['code']).subscribe({

        next: data => {
          if (data){
              if (data.apiError){
                this.error = data.apiError.message;
              }
              else{                
                this._productDetail=this.mapper.mapProductDetail(data.result);   
                this.getAvailableColors(this._productDetail.product.id, 0);
                this.getAvailableSizes(this._productDetail.product.id, 0);
                this.buildImageUrls();
                console.log('productDetail', this._productDetail);
              }                          
          }
        },
        error: error => {
          prodSub.unsubscribe();
          
        },
        complete: () => {
          prodSub.unsubscribe();
          this._loaded=true;
        }
      })
    }
  }

  goback(){
    this.location.back();
  }

  selectTab(tabName){
    this.resetTabs();
    switch(tabName){
      case 'features':
        this.featureTab= this.activeTabClass;        
        this.featureContentTab=this.activeContentClass;
        break;
      case 'specs':
        this.specsTab= this.activeTabClass;
        this.specsContentTab=this.activeContentClass;
        break;
      case 'others':
        this.otherTab= this.activeTabClass;
        this.otherContentTab=this.activeContentClass;
        break;
      default:
        this.featureTab= this.activeTabClass;
        this.featureContentTab =this.activeContentClass;
        break;        
    }
  }


  resetTabs(){
    this.featureTab= this.inActiveTabClass;
    this.specsTab = this.inActiveTabClass;
    this.otherTab = this.inActiveTabClass;

    this.featureContentTab=this.inActiveContentClass;
    this.specsContentTab = this.inActiveContentClass;
    this.otherContentTab=this.inActiveContentClass;
  }

  initTabs(){
    this.featureTab= this.activeTabClass;
    this.specsTab = this.inActiveTabClass;
    this.otherTab = this.inActiveTabClass;

    this.featureContentTab=this.activeContentClass;
    this.specsContentTab = this.inActiveContentClass;
    this.otherContentTab=this.inActiveContentClass;
  }

  get activeTabClass(){
    return "nav-item nav-link active";
  }

  get inActiveTabClass(){
    return "nav-item nav-link";
  }


  get activeContentClass(){
    return "tab-pane fade show active";   
  }

  get inActiveContentClass(){    
    return "tab-pane fade";
  }


  get shoppingFormControls(){
    return this.shoppingForm.controls;
  }

  submit(){
    console.log('color=', this.shoppingFormControls.color.value);
    console.log('size=', this.shoppingFormControls.size.value);
    console.log('quantity=', this.shoppingFormControls.quantity.value);
    console.log('productId=', this._productDetail.product.id);


    let productid = this._productDetail.product.id;
    let colorId = this.shoppingFormControls.color.value;
    let sizeId=this.shoppingFormControls.size.value;
    let quantities = this.shoppingFormControls.quantity.value;

    this.addToCart(productid, colorId, sizeId, quantities);

  }

  addToCart(productId:number, colorId:number, sizeId:number, quantities:number){   
   
    console.log('before calling shoppingCartService.addItemToCart');

    if (Number(colorId) && Number(sizeId) && Number(quantities)){
      console.log('calling shoppingCartService.addItemToCart');
      this.shoppingCartService.addItemToCart(productId, colorId, sizeId, quantities);
    }
  }

  getAvailableColors(productId:number, sizeId:number){
    let colorSub=this.productService.getAvailableColors(productId, sizeId).subscribe({
      next: data => {
        if (data && data.result){
            this.availableColors=data.result;
        }        
        else if (data && data.apiError){
            this.error = data.apiError.message;
        }
      },
      error: error => {
        this.error = error;
        colorSub.unsubscribe();
      },
      complete: () => {
        colorSub.unsubscribe();
      }

    });
  }

  
  getAvailableSizes(productId:number, colorId:number){
   
      let sizesSub=this.productService.getAvailableSizes(productId, colorId).subscribe({
        next: data => {
          if (data && data.result){            
            this.availableSizes= this.mapper.mapProductSizes(data.result);            
        }        
        else if (data && data.apiError){
            this.error = data.apiError.message;
        }
        },
        error: error => {
          sizesSub.unsubscribe();
        },
        complete: () => {
          sizesSub.unsubscribe();
        }
      });
   
  }


}
