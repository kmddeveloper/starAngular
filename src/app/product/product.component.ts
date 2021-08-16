
//ng g c product/product --flat
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,  ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import {LoadingService} from 'src/app/core/services/loading/loading.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { Product} from '../core/models/Product';
import {IproductList} from './iproduct-list';
import {ProductService} from '../core/services/product/product.service';
import { AsyncPipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, IproductList {


 
 
  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute, public loader: LoadingService,
              private utilsService: UtilsService ) { }

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];


  pageEvent: PageEvent;

  loading$ = this.loader.loading$
  errorMsg :any;

  paramMapSub:Subscription;              
  private _grid:Product[][] | undefined; //_grid:Product[][]=[];

  get products():Product[][]{
    return this._grid;
  }

  set products(value:Product[][]){
     this._grid = value;
  }

  ngOnInit(): void {
      
      let pageNum:Number=0;
      let pageSize:Number=0;
      let categoryId:Number=0;
              
       //If this page url won't change such as navigating to next item
       //We can use the snap shot of the query paramMap as follow:
       //let snapPagNum = this.activatedRoute.snapshot.queryParamMap.get('pagenum');
       //console.log('snapPagNum',snapPagNum);


      //Subscription Method
        this.paramMapSub=this.activatedRoute.queryParamMap.subscribe({
        next: (paramMap: ParamMap) => {     
          if (!paramMap || !paramMap['params']){
            this.errorMsg = 'Invalid url query!';
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
         

            this.loader.show();
            console.log('calling getproduct');
            let prodSub = this.productService.getProduct(pageNum, pageSize,categoryId)
              .subscribe({
                next: data => {  //next            
                  if (data){
                      console.log('next');
                      this._grid=this.populateGrid(data);    
                      console.log(this._grid);                    
                  }},              
                error: error  => {
                  console.log(error);
                  this.errorMsg = error;
                  this.loader.hide();  
                },
                complete: () =>{ //completed
                  console.log('completed');
                  this.loader.hide();  
                  prodSub.unsubscribe;
                }
              });     
           
        },
        error: error => {
            console.log('error', error);
        },
        complete: ()=>{}

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

}
