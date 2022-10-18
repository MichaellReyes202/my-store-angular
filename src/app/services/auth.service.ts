import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Variables de entorno
import { environment } from './../../environments/environment.prod';

// import del modelo
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators'

// servicios
import { TokenService } from './../services/token.service';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   private apiUrl: string = `${environment.API_URL}/api/auth`;
   private profileStore = new BehaviorSubject<User | null>(null);
   public profileStore$ = this.profileStore.asObservable();

   constructor(private http: HttpClient, private tokenServices: TokenService) { }

   public setCurrentProfile(user: User | null) {
      this.profileStore.next(user);
      return this.profileStore$;
   }
   public login(email: string, password: string) {
      return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password })
         .pipe(
            tap(response => {
               this.tokenServices.saveToken(response.access_token);
            })
         )
   }
   public profile(): Observable<User | null> {
      return this.http.get<User>(`${this.apiUrl}/profile`)
         .pipe(
            tap(user => {
               console.log(" user => ", user);
               this.profileStore.next(user)
            })
            // switchMap(profile => {
            //    return this.setCurrentProfile(profile);
            // })
         )
   }

   public loginAndGet(email: string, password: string) {
      return this.login(email, password)
         .pipe(
            switchMap(rta => this.profile())
         )
   }
   public logout(): void {
      this.tokenServices.removeToken();
      this.setCurrentProfile(null);
   }


   // const { nombre, correo, password, rol } = req.body;
}

