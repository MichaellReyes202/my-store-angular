import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';

import { environment } from './../../environments/environment.prod'
import { Injectable } from '@angular/core';
import { Observable, throwError, zip } from 'rxjs';


import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http'
import { retry, catchError, map } from 'rxjs/operators';

// import de los interceptores
import { checkTime } from './../interceptors/time.interceptor';

@Injectable({
   providedIn: 'root'
})
export class ProductsService {

   private apiUrl: string = `${environment.API_URL}/api`
   constructor(private http: HttpClient) { }

   public getProductByCategory(categoryId: string, limit?: number, offset?: number): Observable<Product[]> {
      let params = new HttpParams();
      if (limit && offset != null) {
         params = params.set('limit', limit);
         params = params.set('offset', offset);
      }
      return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`,{params});
   }

   public getAllProducts(limit?: number, offset?: number): Observable<Product[]> {
      let params = new HttpParams();
      if (limit && offset) {
         params = params.set('limit', limit);
         params = params.set('offset', offset);
      }
      return this.http.get<Product[]>(`${this.apiUrl}/products`, { params, context: checkTime() })
         .pipe(
            //retry(3), // numero de intentos que se intentar la peticion
            map(product => product.map(item => {
               return {
                  ...item,
                  taxes: .19 * item.price
               }
            }))
         );
   }
   // Para hacer el equivalente del promesis.all()
   public fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
      return zip(  // la respuesta es una array de las respueta de las peticiones
         this.getProductById(id),
         this.updateProduct(id, dto)
      );
   }

   public getProductByPage(limit: number, offset: number): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/products`, {
         params: { limit, offset }
      })
         .pipe(
            map(product => product.map(item => {
               return {
                  ...item,
                  taxes: .19 * item.price
               }
            }))
         )
   }
   public deleteProduct(id: string) {
      return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`)
   }

   public getProductById(id: string): Observable<Product> {
      return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
         .pipe(
            catchError((err: HttpErrorResponse) => {
               if (err.status === HttpStatusCode.InternalServerError) {
                  return throwError(() => new Error('Algo esta fallando en servidor'));
               }
               if (err.status === HttpStatusCode.NotFound) {
                  return throwError(() => new Error('El producto no fue encontrado'));
               }
               if (err.status === HttpStatusCode.Unauthorized) {
                  return throwError(() => new Error('No estas autorizado'));
               }

               return throwError(() => new Error('Ups algo salio mal'));
            })
         )
   }
   public createProduct(dto: CreateProductDTO): Observable<Product> {
      return this.http.post<Product>(`${this.apiUrl}/products`, dto);
   }
   public updateProduct(id: string, dto: UpdateProductDTO) {
      return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
   }

}
