import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators'

// import para la lectura de los paramentros de la ruta
import { ActivatedRoute, ActivationEnd } from '@angular/router';

// import de los servicios
import { ProductsService } from 'src/app/services/products.service';

import { Router } from '@angular/router'; // this.router.navigate(['/artist',artistaId])

// import del modelo
import { Product } from 'src/app/models/product.model';


@Component({
   selector: 'app-category',
   template: `<app-products [products]="products" ></app-products>`,
   styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

   public categoryId: string | null = null;
   public limit: number = 5;
   public offset: number = 0;
   public products: Product[] = [];

   constructor(private activatedRoute: ActivatedRoute, private productServices: ProductsService, private router: Router) { }

   ngOnInit(): void {
      this.activatedRoute.paramMap
         .pipe(
            switchMap((params) => {
               this.categoryId = params.get('id');
               if (this.categoryId) {
                  return this.productServices.getProductByCategory(this.categoryId, this.limit, this.offset);
               }
               return [];
            })
         )
         .subscribe(data => {
            this.products = data;
         })
   }

}
