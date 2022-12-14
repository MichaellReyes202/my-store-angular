import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class TokenService {

   constructor() { }

   public saveToken(token: string){
      localStorage.setItem('token',token);
   }

   public getToken() : string | null{
      const token = localStorage.getItem('token');
      return token;
   }
   public removeToken() : void {
      localStorage.removeItem('token');
   }
}
