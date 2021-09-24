//ng g c product/product-detail --flat

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../core/models/Product';
import { ProductService } from '../core/services/product/product.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';
import { Location } from '@angular/common';



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
              private location:Location) { }

  ngOnInit(): void {
    this.initTabs();
    this.getProduct();
  
  }

  get loaded(){
    if (this._product && this._product.name && this._product.name.length > 0)
      return true;
    return false;
  }

  get product(){
    return this._product;
  }

  getProduct(){
    
    let queryParms = this.activatedRoute.snapshot.queryParams;

    if (queryParms)
    {
      let prodSub = this.productService.getProductByCode(queryParms['code']).subscribe({

        next: data => {
          if (data){
              if (data.error){
                this.error = data.error.message;
              }
              else{
                this._product = data.result;
                console.log('product', this.product);
              }                          
          }
        },
        error: error => {
          prodSub.unsubscribe();
        },
        complete: () => {
          prodSub.unsubscribe();
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

}
