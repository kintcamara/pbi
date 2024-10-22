import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PowerbiService {
  url:string=environment.URL_API_SERVICE_PBI;
  constructor(private readonly http: HttpClient) {}
  getToken(body:any): Observable<any> {
      const headers = new HttpHeaders({
      "Content-Type": "application/json"
     });
     return this.http.post<any>(this.url,body,{headers});
  }
  getDataSets(body:any): Observable<any> {
    const headers = new HttpHeaders({
    "Content-Type": "application/json"
   });
   return this.http.post<any>(`${this.url}/datasets`,body,{headers});
  }
}
