import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, count, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})


export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  searchByAlhpaCode(code: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  //!Importante

  /* Los pipe modifican la informacion, dependiendo de los metodos a utilizar

    - En este caso usamos el metodo catchError donde agarramos el error para modificar la informacion qen caso de eerror
    - con of lo que hacemos es "crear " un nuevo observable y enviar un arreglo vacio

    -   el operador map toma la información recibida del servidor (en este caso, el array de países)
   y la modifica de alguna manera. En este contexto específico,
   se está utilizando para extraer el primer país del array si hay alguno presente,
   o devolver null si el array está vacío. Es una forma de transformar los datos recibidos en algo más útil
    o más adecuado para el caso de uso particular.
  */

  searchCapital(term: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/capital/${term}`)
      .pipe(
        catchError(error => of([]))
      );
  };

  searchCountry(term: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/name/${term}?fullText=false`)
      .pipe(
        catchError(error => of([]))
      );
  }

  searchRegion(term: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/region/${term}`)
      .pipe(
        catchError(error => of([]))
      );
  }

}
