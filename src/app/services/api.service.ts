import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { ToolsService } from './tools.service';
import { finalize, tap } from 'rxjs';
import { Search } from '../interfaces/Search';
import { Reservation } from '../models/Reservation';

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
    const dialogRef = this.toolsService.openWaitDialog();
    return this.http.post(url, data, this.httpOptions).pipe(
      finalize(() => {
        dialogRef.close();
      })
    );
  }
  createUser(data: FormGroup) {
    let url = this.baseUrl + '/createUser';
    const dialogRef = this.toolsService.openWaitDialog();
    return this.http.post(url, data, this.httpOptions).pipe(
      finalize(() => {
        dialogRef.close();
      })
    );
  }
  createDoctor(data: FormGroup) {
    let url = this.baseUrl + '/createDoctor';
    const dialogRef = this.toolsService.openWaitDialog();
    return this.http.post(url, data, this.httpOptions).pipe(
      finalize(() => {
        dialogRef.close();
      })
    );
  }

  loginUser(data: FormGroup) {
    let url = this.baseUrl + '/login';
    return this.http.post<any>(url, data, this.httpOptions);
  }

  createRestoreCode(data: FormGroup) {
    let url = this.baseUrl + '/createRestoreCode';
    const dialogRef = this.toolsService.openWaitDialog();
    return this.http.post(url, data, this.httpOptions).pipe(
      finalize(() => {
        dialogRef.close();
      })
    );
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

  getDoctors() {
    let url = this.baseUrl + '/getDoctors';
    return this.http.get(url);
  }
  getDoctorsByCategory(id: number) {
    let url = this.baseUrl + `/getDoctors/category/${id}`;
    return this.http.get(url);
  }

  search(searchValue: Search) {
    let url = this.baseUrl + '/search';
    const dialogRef = this.toolsService.openWaitDialog();
    return this.http.post(url, searchValue, this.httpOptions).pipe(
      finalize(() => {
        dialogRef.close();
      })
    );
  }
  getDoctor(id: number) {
    let url = this.baseUrl + `/getDoctor/${id}`;
    return this.http.get(url);
  }
  setReservation(data: Reservation) {
    let url = this.baseUrl + `/setReservation`;
    const dialogRef = this.toolsService.openWaitDialog();
    return this.http.post(url, data, this.httpOptions).pipe(
      finalize(() => {
        dialogRef.close();
      })
    );
  }
  getUserReservations(id: number) {
    let url = this.baseUrl + `/getReservations/User/${id}`;
    return this.http.get(url);
  }
  getDoctorReservations(id: number) {
    let url = this.baseUrl + `/getReservations/Doctor/${id}`;
    return this.http.get(url);
  }
}
