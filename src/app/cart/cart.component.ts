import { supportsPassiveEventListeners } from '@angular/cdk/platform';
import { identifierModuleUrl } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { errorBase } from '../core/common/errorBase';
import { ItemInCart } from '../core/models/ItemInCart';
import { ShoppingCart } from '../core/models/ShoppingCart';
import { ShoppingCartService } from '../core/services/shoppingCart/shopping-cart.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends errorBase implements OnInit {

  constructor(private shoppingCartService:ShoppingCartService,private location:Location) {
     super();
  }

  private _shoppingCart:ShoppingCart;
  private _itemsInCart: ItemInCart[]=[];


  ngOnInit(): void {
    this.loadCart();
  }

  get shoppingCart(){
    return this._shoppingCart;
  }


  mapItemsInCart(itemsInCart:any[]){    

    console.log('mapping item in cart=', itemsInCart);
    this._itemsInCart=[];
    itemsInCart.forEach(element => {
      this._itemsInCart.push({ 
        id:element.id,
        product_item_id:element.product_item_id,
        product_id: element.product_id,
        name: element.name,
        description: element.description,
        code: element.code,
        image_url: element.imageUrl,
        price: element.price,
        color: element.color,
        size: element.menSize,
        women_size:element.womenSize,
        quantity: element.quantity,
        available_quantity: element.available_quantity
      })
    });      
  }

  get itemsInCart():ItemInCart[]{   

    console.log('get items in cart=', this._itemsInCart);
    return this._itemsInCart;
  }

  get total(){
    return this._shoppingCart.total;
  }

  get message(){
    if (this._shoppingCart.count > 0){
      return `Hurry! You've ${this._shoppingCart.count} items in your cart`;
    }
    return `You have no item in cart`;
  }

  loadCart(){
    let shopSub = this.shoppingCartService.getCart().subscribe({
      next: data=> {

          if (data && data.apiError){
            this.error = data.apiError.message;           
          }
          else{
            console.log('loadcart data=', data);
            this._shoppingCart = data.result;
            this.mapItemsInCart(this._shoppingCart.itemsInCart);
            console.log('ShoppingCart =', this.shoppingCart );
          }        
      },
      error: error =>{
        console.log('loadcart error =', error);
        this.error = error;
        shopSub.unsubscribe();
      },
      complete: ()=>{
        console.log('loadcart complete');
        shopSub.unsubscribe();
      }
    })
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }


  close(){
    this.location.back();
  }
}
