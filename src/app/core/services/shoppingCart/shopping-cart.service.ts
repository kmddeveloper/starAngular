import { Injectable } from '@angular/core';
import { CookiesService } from '../cookies/cookies.service';
import { StateService } from '../state/state.service';
import { UtilsService } from '../utils/utils.service';
import {ShoppingCart} from 'src/app/core/models/ShoppingCart';
import {CartItem} from 'src/app/core/models/CartItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService{
  


  private _shopping_cart_state = new BehaviorSubject<ShoppingCart>({cartItems:null, count:0});

  public shopping_cart_state$ =  this._shopping_cart_state.asObservable();


constructor(private cookiesService:CookiesService, private stateService:StateService, 
            private utilsService:UtilsService) { 
              this.initialize();
            }
  
            

  role:string | undefined;

  initialize(){  

  
    this.stateService.state$.subscribe({
      next: state=>{    
            this.role=state.role;    
            console.log('SHOPPING CAR INITIALIZE ROLE=', state.role);                   
      },
      error: error => {
          console.log('state error in shopping cart=', error);
      }
    });         
}

  addToCart(productId:number, quantities:number=1){

    if (this.utilsService.compareStrings('guest', this.role, true)){
      this.updateLocalCart(productId, quantities);      
    }   
    else
    {

    } 
    console.log(this.cookiesService.getAllCookies());
  }

 

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

  getCartState(){
    
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

  setCookies(shoppingCart:ShoppingCart){           
    this.cookiesService.setCookie(this.cookiesService.cartItemKey,JSON.stringify(Array.from(shoppingCart.cartItems)));  
    this.cookiesService.setCookie(this.cookiesService.totalcardItemsKey,shoppingCart.count.toString()); 
    this.setState(shoppingCart);
  }

  setState(shoppingCart:ShoppingCart){
    console.log('set state shoppingCart=', shoppingCart);
    this._shopping_cart_state.next(shoppingCart);
  }
 

  getCartItem(productId:number, quantities:number):CartItem{
    return {
      id:productId,
      name:'test',
      description:'test description',
      price:'1.0',
      quantity:quantities,
      imageUrl:'testurl'
    }
  }

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

  private get initCart():ShoppingCart{
    let cartItems = new Map<number, CartItem>();
    return {cartItems:cartItems, count:0};
  }
}

  
