import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  registerUser(data: FormGroup) {
    let url = this.baseUrl + '/register';
    return this.http.post(url, data, this.httpOptions);
  }

  loginUser(data: FormGroup) {
    let url = this.baseUrl + '/login';
    return this.http.post(url, data, this.httpOptions);
  }

  generateBackPath(path: string) {
    return this.baseUrl + '\\' + path;
  }
}
