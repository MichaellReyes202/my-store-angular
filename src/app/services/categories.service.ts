import { Injectable } from '@angular/core';

// import para las peticiones http
import { HttpClient, HttpParams } from '@angular/common/http';

// import de las variables de entorno
import { environment } from '../../environments/environment';

import { Category } from '../models/category.model';

@Injectable({
   providedIn: 'root'
})
export class CategoriesService {

   private apiUrl = `${environment.API_URL}/api`;

   constructor(private http: HttpClient) { }

   public getAllCategory(limit?: number, offset?: number) {
      let params = new HttpParams();
      if (limit && offset) {
         params = params.set('limit', limit);
         params = params.set('offset', limit);
      }
      return this.http.get<Category[]>(`${this.apiUrl}/categories`, { params });
   }
}
