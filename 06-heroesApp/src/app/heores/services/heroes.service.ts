import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })

export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(` ${this.baseUrl}/heroes`);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero) throw Error('Hero is requeired')
    return this.http.post<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  /* Importante
    * Cuando eliminamos un heroe de nuestor backend nos devuelve un arreglo vacio
    * Para que sea mas eficiente la funcion, con el pipe si hay un error devolvemos false y no un arreglo o error
    * Convertirmos ese error con la funcion of a un boleano
    * Y si no hay error quiere decir que todo salio bien devolvemos true
  */

  deleteHeroById(id: string): Observable<boolean> {
    return this.http.delete<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(false)),
        map(resp => true)
      );
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
