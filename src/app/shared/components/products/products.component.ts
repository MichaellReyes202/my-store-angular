import { Component, Input, Output, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';

import { Product, CreateProductDTO, UpdateProductDTO } from 'src/app/models/product.model';

// Import de los servicios
import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';

@Component({
   selector: 'app-products',
   templateUrl: './products.component.html',
   styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

   constructor(private storeService: StoreService, private productService: ProductsService) {
      //this.myShoppingCart = this.storeService.getShoppingCart();
   }

   @Input() public products: Product[] = [];
   @Input() set productId(id: string | null) {
      if(id){
         this.onShowDetail(id);
      }
   }
   @Output() loadMore = new EventEmitter<void>();

   //private myShoppingCart: Product[] = [];
   public total: number = 0;
   public showProductDetail: boolean = false;
   public listo: boolean = false;


   public statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

   productChosen: Product = {
      id: '',
      price: 0,
      images: [],
      title: '',
      description: '',
      category: {
         id: '0',
         name: ''
      }
   }

   public onAddToShoppingCard(product: Product): void {
      this.storeService.addProduct(product);
      this.total = this.storeService.getTotal();
   }
   public toggleProductDetail(): void {
      this.showProductDetail = !this.showProductDetail;
      this.listo = false;
   }
   public onShowDetail(id: string): void {
      this.statusDetail = 'loading';
      if(!this.showProductDetail){
         this.toggleProductDetail();
      }
      this.productService.getProductById(id)
         .subscribe({
            next: (data) => {
               this.productChosen = data;
               this.listo = true;
               this.statusDetail = 'success'
            },
            error: (err) => {
               alert(err.message);
               this.statusDetail = 'error'
            },
            complete() {
               console.log("La Peticion fue realizada con exito");
            },
         });
   }

   public createNewProduct(): void {
      const product: CreateProductDTO = {
         title: 'Nuevo Producto',
         price: 1000,
         description: 'bla bla abla ',
         images: ['https://placeimg.com/640/480/any'],
         categoryId: 1
      }
      this.productService.createProduct(product).
         subscribe({
            next: (value) => {
               this.products.unshift(value);
            },
            error: (err) => {
               console.log(err);
            },
            complete: () => {
               console.log("todo ocurrio de forma corre")
            },
         });
   }
   public updateProduct(): void {
      const changes: UpdateProductDTO = {
         title: "Change title"
      }
      const id = this.productChosen.id;
      this.productService.updateProduct(id, changes)
         .subscribe(data => {
            const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
            this.products[productIndex] = data;
            this.productChosen.title = data.title;
         })
   }
   public deleteProduct(): void {
      const id = this.productChosen.id;
      this.productService.deleteProduct(id)
         .subscribe(() => {
            const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
            this.products.splice(productIndex, 1);
            this.showProductDetail = false;
         })
   }
   public onLoadMore(): void {
      this.loadMore.emit();
   }

}
