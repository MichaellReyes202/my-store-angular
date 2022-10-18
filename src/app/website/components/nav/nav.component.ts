import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import de los servicios
import { StoreService } from '../../../services/store.service';
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';


// import del modelo
import { User } from '../../../models/user.model';
import { Category } from '../../../models/category.model';
import { Auth } from 'src/app/models/auth.model';

import { switchMap, tap } from 'rxjs';

@Component({
   selector: 'app-nav',
   templateUrl: './nav.component.html',
   styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit ,OnDestroy {

   public activeMenu = false;
   public counter = 0;
   public profile: User | null = null;
   public categories: Category[] = [];


   constructor
      (
         private storeService: StoreService,
         private authServices: AuthService,
         private categoryServices: CategoriesService,
         private router: Router
      ) {
   }
   ngOnDestroy(): void {
      
   }

   ngOnInit(): void {
      this.storeService.myCart$.subscribe(products => {
         this.counter = products.length;
      });
      this.getAllCategories();
      this.authServices.profileStore$
         .subscribe(data => {
            this.profile = data;
         })
   }

   toggleMenu() {
      this.activeMenu = !this.activeMenu;
   }

   public login(): void {
      // this.authServices
      //    .login('michaelljoel12.reyes202@gmail.com', '123456789M')
      //    .pipe(
      //       switchMap(() => {
      //          return this.authServices.profile();
      //       }),
      //       switchMap((profile : User) => {
      //          return this.authServices.setCurrentProfile(profile)
      //       })
      //    )
      //    .subscribe((userActive) => {
      //       this.profile = userActive;
      //    });
      this.authServices.loginAndGet('michaelljoel.reyes202@gmail.com', '123456789M')
         .subscribe(() => {
            this.router.navigate(['/profile']);
            //this.profile = user;
         });
   }

   public getAllCategories(): void {
      this.categoryServices.getAllCategory()
         .subscribe(data => {
            this.categories = data;
         })
   }
   public logout(): void {
      this.authServices.logout();
      this.profile = null;
      this.router.navigate(['/home'])
   }

}
