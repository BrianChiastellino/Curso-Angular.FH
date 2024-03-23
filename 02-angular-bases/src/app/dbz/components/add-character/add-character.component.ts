import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz--add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent {

  @Output()
  public onNewCharacter: EventEmitter<Character> = new EventEmitter();

  public character: Character = {
    name: '',
    power: 0
  }

  public emitCharacter(): void {

    //!Importante
    // Esta es una forma de depurar, cuando llega a esta linea de codigo, por consola podemos ver los valores y demas.
    // debugger;

    if (this.character.name.length === 0) return;

    this.onNewCharacter.emit({ ...this.character }); // <-- Cuando hacemos un spread enviamos un nuevo objeto, asi cambiamos la referencia

    this.character.name = '';
    this.character.power = 0;



    //! Importante
    /*
      this.onNewCharacter.emit(this.character);

      this.character.name = '';
      this.character.power = 0;

      Nosotros al NO instanciar un character nuevo, siempre vamos a modificar el mismo character porque
      Angular solo verifica los cambios en las referencias de los objetos, no en las propiedades individuales de los objetos.

      En estas lineas de codigo siempre hablamos de la misma referencia.

      Estamos cambiando las propiedads del objeto, pero es la mimsa referencia por eso se modfiica.
    */
  }

}
