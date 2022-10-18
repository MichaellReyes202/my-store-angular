import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

// Servicio
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';


@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor
      (
         private authService: AuthService,
         private tokenService: TokenService,
         private router: Router
      ) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = this.tokenService.getToken();
      if (!token) {
         this.router.navigate(['/home']);
         return false;
      }
      console.log('gard token existe');

      // return this.authService.profileStore$.pipe(
      //    map(user => {
      //       if(!user){
      //          console.log('User null gard');
      //          this.router.navigate(['/home']);
      //          return false;
      //       }
      //       console.log('profile gard => ',user);
      //       return true;
      //    })
      // )
      return this.authService.profile().pipe(
         map(user => {
            if (!user) {
               console.log('User null gard');
               this.router.navigate(['/home']);
               return false;
            }
            console.log('profile gard => ', user);
            return true;
         })
      )

   }

}
