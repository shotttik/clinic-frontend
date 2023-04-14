import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToolsService } from './tools.service';
import { tap } from 'rxjs';

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

  constructor(private http: HttpClient, private toolsService: ToolsService) {}

  registerUser(data: FormGroup) {
    let url = this.baseUrl + '/register';
    return this.http.post(url, data, this.httpOptions);
  }
  createUser(data: FormGroup) {
    let url = this.baseUrl + '/createUser';
    return this.http.post(url, data, this.httpOptions);
  }
  createDoctor(data: FormGroup) {
    let url = this.baseUrl + '/createDoctor';
    return this.http.post(url, data, this.httpOptions);
  }

  loginUser(data: FormGroup) {
    let url = this.baseUrl + '/login';
    return this.http.post<any>(url, data, this.httpOptions);
  }

  createRestoreCode(data: FormGroup) {
    let url = this.baseUrl + '/createRestoreCode';
    return this.http.post(url, data, this.httpOptions);
  }
  resetPassword(data: FormGroup) {
    let url = this.baseUrl + '/resetPassword';
    return this.http.post(url, data, this.httpOptions);
  }

  generateBackPath(path: string) {
    return this.baseUrl + '\\' + path;
  }
}
