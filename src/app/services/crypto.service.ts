import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = 'http://localhost:5017/v1/api/Socket';

  constructor(private http: HttpClient) { }

  connect(pair: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/connect`, null, {
      params: new HttpParams().set('pair', pair)
    });
  }

  getData(pair: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`, {
      params: new HttpParams().set('pair', pair)
    });
  }

  disconnect(pair: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/disconnect`, null, {
      params: new HttpParams().set('pair', pair)
    });
  }
}
