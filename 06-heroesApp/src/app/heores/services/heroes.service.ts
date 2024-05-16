import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })

export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(` ${this.baseUrl}/heroes`);
  }


  /* Importante
    * En el pipe de la funcion getHeroById devolvemos un Hero o Undefined
    * Peticion http como hacemos siempre
    * Con el pipe, si hay un error o trae algo que no es de tipo Hero
    * Con " of " creamos un nuevo observable y enviamos el undefined
  */

  getHeroeById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(catchError(error => of(undefined)))
  }

  /* Importante
   * Creamos esta query para que el usuario cuando ingrese el personaje en el input
      con el autocomplete de Angular Material se vea como busquedas relacionadas
 */

  getSuggestion(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&limit=6`);
  }

}
