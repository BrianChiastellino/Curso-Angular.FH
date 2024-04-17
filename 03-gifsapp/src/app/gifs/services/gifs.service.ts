import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = "LXdhHwRo5EEOasBmeF4DykBQt3hzpPko"


@Injectable({
  providedIn: 'root'
})

export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = "LXdhHwRo5EEOasBmeF4DykBQt3hzpPko";
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) {
    this.loadlLocalStorage();
  }


  get tagsHistory() {
    // Los arreglos pasan x referencia, con el operador spread pasamos por copia
    return [...this._tagsHistory];
  }

  //!Importante
  /*
    Lo que hace esta funcion es organizar el registro
    Si el tag ya existia, lo borra y lo coloca en la cola como
    Si fuese el primero
  */

  private organizeHistory(tag: string) {
    //Paso todo a minuscula
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((t) => t !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadlLocalStorage(): void {
    if (!localStorage.getItem('history')) { return }
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length === 0) { return };
    this.searchTag(this._tagsHistory[0]);

  }

  searchTag(tag: string): void {

    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)


    //!Imporntante
    /*
      Para castear el tipo de dato y acceder a sus propiedades
      El get admite genricos entonces ponemos SearchResponse

    */
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        this.gifList = resp.data;
        // console.log(this.gifList);
      });


  };


}


