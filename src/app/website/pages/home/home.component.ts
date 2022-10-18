import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Import del modelo
import { Product } from 'src/app/models/product.model';

// import de los servicios
import { ProductsService } from 'src/app/services/products.service';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   public products: Product[] = [];
   public limit: number = 10;
   public offset: number = 0;
   public productId : string | null = null;

   constructor
   (
      private productService : ProductsService,
      private activatedRoute : ActivatedRoute
   )
   { }

   ngOnInit(): void {
      this.productService.getProductByPage(5, 0)
         .subscribe(data => {
            this.products = data;
            this.offset += this.limit;
         })
      // para recibir los parametros url
      this.activatedRoute.queryParamMap.subscribe(params => {
         this.productId = params.get('product');
         console.log('product Id param => ',this.productId);
      });
   }
   public onLoadMore(): void {
      this.productService.getProductByPage(this.limit, this.offset)
         .subscribe(data => {
            this.products = this.products.concat(data);
            this.offset += this.limit;
         })
   }

}
