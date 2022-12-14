import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

interface IFile {
   originalname: string,
   filename: string,
   location: string
}

@Injectable({
   providedIn: 'root'
})
export class FilesService {
   private apiUrl: string = `${environment.API_URL}/api/files` // upload
   constructor(private http: HttpClient) { }

   public getFile(name:string,url:string,type:string) {
      return this.http.get(url,{responseType: 'blob'})
      .pipe(
         tap(content => {
            const blob = new Blob([content],{type});
            saveAs(blob,name);
         }),
         map(() => true) // si todo salio bien retorno un true
      )
   }

   uploadFile(file: Blob){
      const dto = new FormData();
      dto.append('file',file) // file => el nombre como se espera en el backend
      return this.http.post<IFile>(`${this.apiUrl}/upload`,dto,{
         // headers : {
         //    'Content-type':'multipart/form-data'
         // }
      });
   }
}
