import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';

//! Importante
// UUID genera id random
// Podemos cambiar el nombre con 'as' cambiamos v4 por uuid por si no nos gusta el nombre
import { v4 as uuid } from 'uuid'

@Injectable({
  providedIn: 'root'
})


export class DbzService {

  public characters: Character[] = [{
    id: uuid(),
    name: 'Krillin',
    power: 1000,
  }, {
    id: uuid(),
    name: 'Goku',
    power: 9500,
  }, {
    id: uuid(),
    name: 'Vegeta',
    power: 7500,
  }];

  addCharacter(character: Character): void {

    // this.characters.unshift(character); --> Agrega al inicio
    // this.characters.push(character); --> Agrega al final del array

    //!Importante
    /*  Usamos el operador spread para decirle que tome todos los valores del character, y despues le asignamos el id
        Esto sirve mucho cuando tenemos muchos valores por el cual pasar.
    */
    const newCharacter: Character = { ...character, id: uuid() };

    this.characters.push(newCharacter);
  }

  deleteCharacterById(id: string): void {

    /*  Primero parametro desde que posicion del array empieza a eliminar
        Segundo parametro cantidad de elementos que va a eliminar
    this.characters.splice(index, 1);

        */

    //!Importante
    //Fliter devuelve un arreglo nuevo cumpliendo la condicion, en caso de que el id sea igual no lo filtra
    this.characters = this.characters.filter(c => c.id !== id);

  }
}
