import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Variables de entorno
import { environment } from './../../environments/environment.prod';

// import del modelo
import { CreateUserDTO, User } from './../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class UsersService {

   constructor(private http: HttpClient) { }
   // https://young-sands-07814.herokuapp.com/api/users
   private apiUrl: string = `${environment.API_URL}/api`;

   public createUser(dto: CreateUserDTO): Observable<User> {
      return this.http.post<User>(`${this.apiUrl}/users`, dto);
   }
   public getAll(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiUrl}/users`)
   }

   public myLogin(correo: string, password: string) {
      let url = "https://rest---server---node.herokuapp.com/api/auth/login";
      return this.http.post(url, { correo, password });
   }
   public myRegister(nombre: string, correo: string, password:string ,rol: string) {
      let url = "https://rest---server---node.herokuapp.com/api/users";
      return this.http.post(url, { nombre, correo,password, rol });
   }

}
