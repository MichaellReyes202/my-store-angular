import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
   selector: 'app-profile',
   templateUrl: './profile.component.html',
   styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

   constructor(private authService: AuthService) { }

   public user : User | null = null;


   ngOnInit(): void {
      this.authService.profileStore$
      .subscribe(data => {
         this.user = data;
      })
   }

}
