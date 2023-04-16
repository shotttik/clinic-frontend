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
      'Content-Disposition': 'multipart/form-data',
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

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    let url = this.baseUrl + '/upload';
    return this.http.post(url, formData);
  }

  getCategories(doctors: boolean = false) {
    let url = this.baseUrl + '/categories';
    const params = { withDoctors: doctors };
    return this.http.get(url, { params });
  }

  deleteCategory(id: number) {
    let url = this.baseUrl + `/deleteCategory/${id}`;
    return this.http.post(url, {});
  }
}
