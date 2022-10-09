import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { QuicklinkModule } from 'ngx-quicklink';

// Modulo de rutas
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

// Modulo paras las peticiones http y los interceptores
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'


// import de los modulos
import { AppComponent } from './app.component';



// import de los interceptores
import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
   declarations: [
      AppComponent,
      NotFoundComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      QuicklinkModule
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
