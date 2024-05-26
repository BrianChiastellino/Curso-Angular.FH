import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, map, of, switchMap, tap, catchError } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User

  constructor(private http: HttpClient) { }

  // structuredClone ¿que es

  get currentUser(): User | undefined {
    if (!this.user) return undefined;

    return structuredClone(this.user);
  }

  /**
   * Las buenas practicas dicen que los tap y ademas de los otros metodos, tienen que hacer una sola cosa
   *

   */

  public login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', 'AsldkjaskldjAKSl.kajdskals.kajsdla')),
      );
  }

  /*
      * La doble negación (!!user) se usa para asegurar que el valor de user se convierta explícitamente a un  booleano. Esto es útil para controlar flujos lógicos de una manera clara y predecible, especialmente cuando   se trabaja con operadores de RxJS que requieren una transformación de datos.
  */

  public checkAuthentication(): Observable<boolean> | boolean {
    if (!localStorage.getItem('token')) return false;

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(error => of(false)),

      )


  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }

}
