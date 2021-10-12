import { Injectable } from '@angular/core';
import { CookiesService } from '../cookies/cookies.service';
import { StateService } from '../state/state.service';
import { UtilsService } from '../utils/utils.service';
import {ShoppingCart} from 'src/app/core/models/ShoppingCart';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { EndpointService } from '../endpoint/endpoint.service';
import { ApiResponse } from '../../models/ApiResponse';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService{
  


private _shopping_cart_state = new BehaviorSubject<ShoppingCart>({itemsInCart:null, count:0, total:0});

public shopping_cart_state$ =  this._shopping_cart_state.asObservable();

constructor(private cookiesService:CookiesService, private stateService:StateService, 
            private utilsService:UtilsService, private httpService:HttpService,
            private endpointService:EndpointService, private productService:ProductService) { 
              this.initialize();
            }
          
  role:string | undefined;
  sessionid:string | undefined;
  userid:string |  undefined;

  initialize(){  
  
    this.stateService.state$.subscribe({
      next: state=>{    
            this.role=state.role;  
            this.userid =  this.utilsService.compareStrings('guest', this.role, true)?
            this.cookiesService.getClientId():
            state.user_id.toString();
            console.log('SHOPPING CAR INITIALIZE ROLE=', state.role);                   
      },
      error: error => {
          console.log('state error in shopping cart=', error);
      }
    });         
  }


  addItemToCart(productId:number, colorId:number, sizeId:number, quantities:number){
    let reqSub = this.productService.requestProfuctItemId(productId,colorId,sizeId).subscribe({

      next: data => {
            if (data && Number(data.result)){
                console.log('calling add to cart');
                this.addToCart(productId, data.result, quantities);
            }
      },      
      error: error => {
        console.log('Error add to cart');
      },
      complete: ()=>{
        console.log('Completed add to cart');
      }
    })
   

  }

  addToCart(productId:number, productItemId:number, quantities:number=1){   

    console.log('userid=', this.userid);

    let addSub = this.httpService.postAsync<ApiResponse<ShoppingCart>>(`${this.endpointService.addItemToCart}`,{"productid":productId, "productitemid":productItemId, "quantity": quantities, "userid":this.userid}).subscribe({
        next: data=>{
          if (data && data.result){
            this.setState(data.result);
            console.log('add to cart shopping cart=',data.result);
          }                    
        },
        error: error =>{
          addSub.unsubscribe();
        },
        complete: ()=>{
          addSub.unsubscribe();
        }       
    });      
  }

  getCartState(){
    let getSub = this.httpService.getAsync<ApiResponse<ShoppingCart>>(`${this.endpointService.getCart}/${this.userid}`).subscribe({
      next: data=>{
        if (data && data.result){
          this.setState(data.result);
          console.log('get shopping cart=',data.result);
        }                    
      },
      error: error =>{
        getSub.unsubscribe();
      },
      complete: ()=>{
        getSub.unsubscribe();
      }       
  });      
  }

  setState(shoppingCart:ShoppingCart){
    console.log('set state shoppingCart=', shoppingCart);
    this._shopping_cart_state.next(shoppingCart);
  }

  getCart():Observable<ApiResponse<ShoppingCart>>{
    return this.httpService.getAsync<ApiResponse<ShoppingCart>>(`${this.endpointService.getCart}/${this.userid}`);
  }

  private get initCart():ShoppingCart{
    return {itemsInCart:null, count:0, total:0};
  }

/*
  private updateLocalCart(productId:number, quantities:number){

    let cartItemKey = this.cookiesService.cartItemKey;
    if (this.cookiesService.checkCookie(cartItemKey)){
      let jsonValue = this.cookiesService.getCookie(cartItemKey);
      
      if (jsonValue){          
           console.log('get one cookie=', jsonValue);    
          let cart =  new Map<number,CartItem>(JSON.parse(jsonValue));         
          if (cart.has(productId)){

              let cartItem = cart.get(productId);              
              cart.delete(productId);
              if (cartItem && !isNaN(cartItem.quantity)){
                  cartItem.quantity += quantities;                
                  cart.set(productId, cartItem);               
              }
              else{
                 cart.set(productId, cartItem);                
              }
          }
          else{            
            cart.set(productId, this.getCartItem(productId, quantities));
          }
          
         let shoppingCart = this.buildShoppingCart(cart);
          console.log('cart=', shoppingCart.cartItems);
          console.log('count=', shoppingCart.count);
          this.setCookies(shoppingCart);
          return;
      }
    }

    //If Cart does not exist in cookies.
    let cart = new Map<number, CartItem>();
    cart.set(productId, this.getCartItem(productId, quantities));    
    console.log('inside update cart, cart=', cart);
    let shoppingCart = this.buildShoppingCart(cart);

    console.log('cart=', shoppingCart.cartItems);
    console.log('count=', shoppingCart.count);
    this.setCookies(shoppingCart);
      
  }
*/

  /*
  getCartState_old(){
    
    console.log('get cart state role=',this.role);
    if (this.utilsService.compareStrings('guest', this.role, true)){
      this.getLocalCartState();   
      console.log('get guest cart') ;
    }    
    else{
      this._shopping_cart_state.next(this.initCart); 
      console.log('get other user cart') ;
    }
    console.log('after getting cart state');    
  }
*/
  /*
  private getLocalCartState(){
    let cartItemKey = this.cookiesService.cartItemKey;
    let shoppingCart=this.initCart;

    if (this.cookiesService.checkCookie(cartItemKey)){
      let jsonValue = this.cookiesService.getCookie(cartItemKey);
      if (jsonValue){          
      
          console.log('cart jsonValue=', jsonValue);
          let cart =  new Map<number,CartItem>(JSON.parse(jsonValue)); 
          shoppingCart = this.buildShoppingCart(cart);            
          console.log('cart=', shoppingCart.cartItems);
          console.log('count=', shoppingCart.count);

        }
    }
    this.setState(shoppingCart);   
  }
  */

  /*
  setCookies(shoppingCart:ShoppingCart){           
    this.cookiesService.setCookie(this.cookiesService.cartItemKey,JSON.stringify(Array.from(shoppingCart.cartItems)));  
    this.cookiesService.setCookie(this.cookiesService.totalcardItemsKey,shoppingCart.count.toString()); 
    this.setState(shoppingCart);
  }
*/
  
/*
  buildShoppingCart(cart:Map<number,CartItem>):ShoppingCart{
    let count:number=0;
    let cartItems = new Map<number, CartItem>();
   
    let shoppingCart:ShoppingCart=this.initCart;

    if (cart instanceof Map){
      cart.forEach((cartItem: CartItem, key: number) => {   
        console.log('before set cartitem=', cartItem);
        shoppingCart.cartItems.set(key, cartItem);       
        shoppingCart.count+= cartItem.quantity;
      });
      console.log('before assign cartitems');
      this._shopping_cart_state.next(shoppingCart);
      console.log('ShoppingCart=', shoppingCart);
    }
    return shoppingCart;
  }
*/
  
/*
  //Convert items in cookies to post fields
  getPostFields():string{
    let cartItemKey = this.cookiesService.cartItemKey;
    if (this.cookiesService.checkCookie(cartItemKey)){
      let jsonValue = this.cookiesService.getCookie(cartItemKey);
      if (jsonValue){          

        let mapItem =  new Map<number,CartItem>(JSON.parse(jsonValue)); 

        if (mapItem instanceof Map){

          let cartItems=new Array<CartItem>();
          mapItem.forEach((cartItem: CartItem, key: number) => {
            cartItems.push(cartItem);
          })
          return JSON.stringify(cartItems);
          
        }
      }
    }
    return null;
  }
  */



}

  
