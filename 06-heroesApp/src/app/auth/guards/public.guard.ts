import { Injectable } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })

export class PublicGuard {

  constructor(
    private authService: AuthService,
    private rotuer: Router,
  ) { }

  /**
   *  Con el ' map ' cambiamos el valor de la respuesta ya que si el guard da false no pasa,
   *  Lo que buscamos con esa funcion es que si el usuario esta loguado, no pueda volver a la seccion logueo
   *    pero si da true    si pasa
   *  Entonces como da true porque esta logueado, le decimos que tome el valor inverso, para que no vuelva.
   *
   */

  private checkAuthStatus(): Observable<boolean> | boolean {
    return this.authService.checkAuthentication()
      .pipe(
        tap(isAuthenticated => {
          if (isAuthenticated) {
            this.rotuer.navigate(['./']);
          }
        }),
        map(isAuthenticated => !isAuthenticated)
      )
  }

  public canMatch: CanMatchFn = (route, segments) => {
    return this.checkAuthStatus();
  };

  public canActivate: CanActivateFn = (route, state) => {
    return this.checkAuthStatus();
  };

}
