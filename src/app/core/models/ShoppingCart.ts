import {CartItem} from './CartItem';

export class ShoppingCart{
   cartItems:Map<number,CartItem>;
   count:number;
}