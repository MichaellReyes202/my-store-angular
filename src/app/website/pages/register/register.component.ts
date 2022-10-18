import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OnExit } from 'src/app/guards/exit.guard';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnExit {

   constructor() { }
   onExit() : Observable<boolean> | Promise<boolean> | boolean {
      const rta = confirm('Logica desde component , esta seguro que quieres salir ?');
      return rta;
   }

   ngOnInit(): void {
   }

}
