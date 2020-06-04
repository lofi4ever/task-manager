import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '../_services';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private accountService: AccountService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if(err.status === 401) {
        this.accountService.logout();
      }
      let error = err.message || err.statusText;
      return throwError(error);
    }))
  }
}