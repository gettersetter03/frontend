import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // To make changes we need to clone the original request.

// As we clone the original request we can set the headers we want. 
// In our case its very simple–we just want to add an Authorization 
// header with an auth scheme of Bearer followed by the JSON Web Token
//  in local storage which we get from a call to the getToken method from
// the AuthService.
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }
}