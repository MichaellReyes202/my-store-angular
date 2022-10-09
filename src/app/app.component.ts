import { Component } from '@angular/core';

// import de los servicios
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

import { FilesService } from './services/files.service';
@Component({
   selector: 'app-root',
   template: `<router-outlet></router-outlet>`, // app.component.html
   styleUrls: ['./app.component.scss']
})
export class AppComponent {

   imgParent = '';
   showImg: boolean = false;
   token: string = '';
   imgRta: string = '';


   constructor(private usersServices: UsersService, private filesServices: FilesService) { }

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
         email: 'michaelljoel2.reyes202@gmail.com',
         password: '123456789M'
      })
      .subscribe(rta => {
         console.log(rta);
      })

   }

}
