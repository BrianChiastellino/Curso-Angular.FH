import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-list-character',
  templateUrl: './list-character.component.html',
  styleUrls: ['./list-character.component.css']
})
export class ListCharacterComponent {

  //!Importante
  // Input recibe informacion desde el padre
  @Input() public characterList: Character[] = [{
    name: 'Trunks',
    power: 10
  }];

  @Output() public onDeleteId: EventEmitter<string> = new EventEmitter();


  onDeleteCharacter(id?: string): void {

    if (!id) return;
    
    this.onDeleteId.emit(id);
  }

}
