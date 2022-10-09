import { Component, OnInit } from '@angular/core';

// para la lectura de los paramentros de la ruta
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { switchMap } from 'rxjs';

// import del modelo
import { Product } from 'src/app/models/product.model';

// import de los servicios
import { ProductsService } from 'src/app/services/products.service';

@Component({
   selector: 'app-product-detail',
   templateUrl: './product-detail.component.html',
   styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

   public productId: string | null = null;
   public product: Product | null = null;

   constructor
      (
         private activatedRoute: ActivatedRoute,
         private productsService: ProductsService,
         private location : Location
      ) { }

   ngOnInit(): void {
      this.activatedRoute.paramMap
         .pipe(
            switchMap(params => {
               this.productId = params.get('id');
               if (this.productId) {
                  return this.productsService.getProductById(this.productId);
               }
               return [null];
            })
         )
         .subscribe(data => {
            this.product = data;
         })
   }
   public goToBack(): void {
      this.location.back();
   }


}
