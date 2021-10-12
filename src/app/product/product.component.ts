
//ng g c product/product --flat
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,  ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {LoadingService} from 'src/app/core/services/loading/loading.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { Product} from '../core/models/Product';
import {IproductList} from './iproduct-list';
import {ProductService} from '../core/services/product/product.service';
import { AsyncPipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { StateService } from '../core/services/state/state.service';
import {ShoppingCartService} from 'src/app/core/services/shoppingCart/shopping-cart.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, IproductList {


 
 
  constructor(private productService: ProductService, private stateService:StateService,
              private activatedRoute: ActivatedRoute, public loader: LoadingService,
              private utilsService: UtilsService, private router:Router,
              private shoppingCartService:ShoppingCartService ) { }

  
  defaultCategoryId: Number = 1;              
  totalItems:Number = 100;
  pageSize:Number = 10;
  pageSizeOptions: Number[] = [5, 10, 25, 100];

  btnLabel:String| undefined;
  role:String| undefined;

  pageEvent: PageEvent;

  loading$ = this.loader.loading$
  error :any;

  paramMapSub:Subscription;              
  private _grid:Product[][] | undefined; //_grid:Product[][]=[];

  get products():Product[][]{
    return this._grid;
  }

  set products(value:Product[][]){
     this._grid = value;
  }

  ngOnInit(): void {      
      this.initialize();
      this.getProducts();
  }

  initialize(){  
      this.stateService.state$.subscribe({
        next: state=>{    
              this.role=state.role;              
              this.btnLabel=this.role=='admin'? 'Edit': 'Buy';
        },
        error: error => {
            console.log('state error=', error);
        }
      });      
      this.getTotalItems(this.defaultCategoryId);
  }

  getProducts(){
      let pageNum:Number=0;
      let pageSize:Number=0;
      let categoryId:Number=0;
              
       //If this page url won't change such as navigating to next item
       //We can use the snap shot of the query paramMap as follow:
       //let snapPagNum = this.activatedRoute.snapshot.queryParamMap.get('pagenum');
       //console.log('snapPagNum',snapPagNum)

      //Subscription Method
        this.paramMapSub=this.activatedRoute.queryParamMap.subscribe({
        next: (paramMap: ParamMap) => {     
          if (!paramMap || !paramMap['params']){
            this.error = 'Invalid url query!';
            this.loader.hide();  
            return;
          }          
          let lowerParams = this.utilsService.toLower(paramMap['params']);     
            console.log('lowerparams in product component', lowerParams); 
            pageNum= lowerParams['pagenum'] || '0';
            console.log('pageNum', pageNum);
            pageSize= lowerParams['pagesize'] || '0';
            console.log('pageSize', pageSize);
            categoryId= lowerParams['categoryid'] || '0';
            console.log('categoryId', categoryId);
         

            
            console.log('calling getproduct');
            this.getPage(pageNum, pageSize, categoryId);           
           
        },
        error: error => {
            console.log('error', error);
        },
        complete: ()=>{}

      });  
  }

  onPageFired(event){    
    console.log('onPageFired', event);
    this.getPage(event.pageIndex+1, event.pageSize, 1);
  }

  getTotalItems(categoryId:Number){
    let prodSub = this.productService.getTotalItems(categoryId)
    .subscribe({
      next: data => {  //next            
        if (data){

           if (data.apiError)
              this.error = data.apiError.message;
           else
            this.totalItems = data.result;                  
        }},              
      error: error  => {
        console.log(error);
        this.error = error;
        this.loader.hide();  
      },
      complete: () =>{ //completed
        console.log('completed');
        this.loader.hide();  
        prodSub.unsubscribe;
      }
    }); 
  }

  getPage(pageNum:Number, pageSize:Number, categoryId:Number){
    this.error='';
    this.loader.show();
    let prodSub = this.productService.getProduct(pageNum, pageSize, categoryId)
    .subscribe({
      next: data => {  //next            
        if (data){
            console.log('next');
            if (data.apiError){
              this.error = data.apiError.message;
            }
            else{
              this._grid=this.populateGrid(data.result);    
              console.log(this._grid);                    
            }
        }},              
      error: error  => {
        console.log(error);
        this.error = error;
        this.loader.hide();  
      },
      complete: () =>{ //completed
        console.log('completed');
        this.loader.hide();  
        prodSub.unsubscribe;
      }
    });    
  }

  ngOnDestroy(){
    
    this.paramMapSub.unsubscribe();
    this.loader.hide();  
    console.log('destroy');
  }

  onNotify(message:string):void{

    console.log('product component', message);
  }
  populateGrid(data:Product[]):Product[][] {
      
    const grid:Product[][]=[];//new Array<Array<Product>>();
    if (data){      
      let col:Product[]=[]; //new Array<Product>();
     
      data.forEach((product, index) => {               
        col.push(product);
        if ((index+1)%4==0){                 
           grid.push(col);
           col=[];
        }             
      });
      
      if (col && col.length > 0)
          grid.push(col);    
    }
    return grid;
  }

  onClick(id, code){
    let queryParams = this.activatedRoute.snapshot.queryParams;
    console.log('map', queryParams);
    if (this.role=='admin'){
      console.log('admin user clicks=', code);
      this.editPage(code);
    }
    else{
      console.log('other user clicks=', code);
      //this.addToCart(id);
      this.detailPage(code);
    }
    
  }

  editPage(code:string){
    this.router.navigate([`/product/edit`], {queryParams: {code: code}});
  }

  detailPage(code:string){
    this.router.navigate([`/product/product-detail`], {queryParams: {code: code}});
  }

 
}
