import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { ToolsService } from './tools.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private toolsService: ToolsService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');

    if (token) {
      req = req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
    }
    const dialogRef = this.toolsService.openWaitDialog();
    return next.handle(req).pipe(
      finalize(() => {
        dialogRef.close();
      })
    );
  }
}
