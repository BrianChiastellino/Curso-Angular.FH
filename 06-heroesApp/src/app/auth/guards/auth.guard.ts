import { Injectable } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard {

  constructor(
    private authService: AuthService,
    private rotuer: Router,
  ) { }

  private checkAuthStatus(): Observable<boolean> | boolean {
    return this.authService.checkAuthentication()
      .pipe(
        tap(isAuthenticated => {
          if (!isAuthenticated) {
            this.rotuer.navigate(['./auth/login']);
          }
        })
      )
  }

  public canMatch: CanMatchFn = (route, segments) => {
    return this.checkAuthStatus();
  };

  public canActivate: CanActivateFn = (route, state) => {
    return this.checkAuthStatus();
  };

}
