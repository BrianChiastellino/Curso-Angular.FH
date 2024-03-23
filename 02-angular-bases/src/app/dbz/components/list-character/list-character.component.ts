import { Component, Input } from '@angular/core';
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

}
