import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class StoreService {
   private myShoppingCart: Product[] = [];
   private myCart = new BehaviorSubject<Product[]>([]);

   // en forma de observador para la variable myCart
   myCart$ = this.myCart.asObservable();

   addProduct(product: Product): void {
      this.myShoppingCart.push(product);
      this.myCart.next(this.myShoppingCart);
   }
   getShoppingCart(){
      return this.myShoppingCart;
   }
   getTotal() : number {
      return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0)
   }
   constructor() { }
}
