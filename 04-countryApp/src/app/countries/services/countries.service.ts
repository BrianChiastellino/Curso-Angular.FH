import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, count, delay, map, of, pipe, tap } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})


export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {

    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },

  }

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
        //delay(2000) espera dos segundos a que pase el delay //!Importante
      );
  }

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
    const url = (`${this.apiUrl}/capital/${term}`);
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => { this.cacheStore.byCapital = { term: term, countries: countries } }),
        tap(() => this.saveToLocalStorage()),
      );

  };

  searchCountry(term: string): Observable<Country[]> {
    const url = (`${this.apiUrl}/name/${term}?fullText=false`)
    return this.getCountriesRequest(url)
      .pipe(
        tap(country => { this.cacheStore.byCountries = { term: term, countries: country } }),
        tap(() => this.saveToLocalStorage()),
      )
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = (`${this.apiUrl}/region/${region}`)
    return this.getCountriesRequest(url)
      .pipe(
        tap(country => { this.cacheStore.byRegion = { region: region, countries: country } }),
        tap(() => this.saveToLocalStorage()),
      )
  }

}
