import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };
  private baseUrl = 'https://localhost:7039';

  constructor(private http: HttpClient) {}

  registerUser(data: any) {
    let url = this.baseUrl + '/register';
    return this.http.post(url, data, this.httpOptions);
  }

  generateBackPath(path: string) {
    return this.baseUrl + '\\' + path;
  }
}
