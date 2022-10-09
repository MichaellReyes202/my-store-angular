import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicklinkModule } from 'ngx-quicklink';

// import de los modulos
import { WebsiteRoutingModule } from './website-routing.module';
import { SharedModule } from '../shared/shared.module';

import { NavComponent } from './components/nav/nav.component';
import { LayoutComponent } from './components/layout/layout.component';


// import de las paginas
import { HomeComponent } from './pages/home/home.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

import { SwiperModule } from 'swiper/angular';



@NgModule({
   declarations: [
      NavComponent,
      HomeComponent,
      MyCartComponent,
      LoginComponent,
      RegisterComponent,
      RecoveryComponent,
      ProfileComponent,
      ProductDetailComponent,
      LayoutComponent
   ],
   imports: [
      CommonModule,
      WebsiteRoutingModule,
      SharedModule,
      SwiperModule,
      QuicklinkModule
   ]
})
export class WebsiteModule { }
