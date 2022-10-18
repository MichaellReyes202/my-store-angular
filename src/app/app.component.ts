import { Component , OnInit} from '@angular/core';

// import de los servicios
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { TokenService } from './services/token.service';

import { FilesService } from './services/files.service';
import { User } from './models/user.model';
@Component({
   selector: 'app-root',
   template: ` <a routerLink="/profile" >profile</a>
               <button (click)="createUser()">Crear user</button>
               <p *ngIf="prueba">{{prueba.name}}</p>
               <router-outlet></router-outlet>
               `,
   styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

   imgParent = '';
   showImg: boolean = false;
   token: string = '';
   imgRta: string = '';

   constructor
   (
      private usersServices: UsersService,
      private filesServices: FilesService,
      private authService: AuthService,
      private tokenService : TokenService
   ) { }
   ngOnInit(): void {
      const token = this.tokenService.getToken();
      if(token){
         this.authService.profile()
         .subscribe(user => {
            console.log("profile app => ",user);
         });
      }
      this.authService.profileStore$.subscribe( us => {
         this.prueba = us;
      })
   }
   prueba: User | null = null;

   onLoaded(img: string): void {
      console.log('Log padre', img)
   }
   toggleImg(): void {
      this.showImg = !this.showImg
   }

   public downloadPdf() {
      this.filesServices.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
         .subscribe()
   }
   public onUpload(evento: Event) {
      const element = evento.target as HTMLInputElement;
      const file = element.files?.item(0);
      if (file) {
         this.filesServices.uploadFile(file)
            .subscribe(rta => {
               this.imgRta = rta.location;
            });
      }
   }


   /// Metodos de prueba para la creacio de los usuarios
   public createUser() {
      this.usersServices.createUser( {
         name: 'Michaell',
         email: 'michaelljoel.reyes202@gmail.com',
         password: '123456789M',
         role : 'admin'
      })
      .subscribe(rta => {
         console.log(rta);
      })

   }

}
