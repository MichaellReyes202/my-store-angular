import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../models/product.model'

@Component({
   selector: 'app-product',
   templateUrl: './product.component.html',
   styleUrls: ['./product.component.scss']
})
export class ProductComponent   {
   constructor() { }

   @Input() product: Product = {
      id: '',
      price: 0,
      images: [],
      title: '',
      category: {
         id: '0',
         name: ''
      },
      description: '',
      taxes: 0
   }
   @Output() addProduct = new EventEmitter<Product>();
   @Output() showProduct = new EventEmitter<string>();

   public onAddToCard(): void {
      this.addProduct.emit(this.product);
   }
   public onShowDetail(): void {
      this.showProduct.emit(this.product.id);
   }

}
