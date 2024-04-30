import { Component } from '@angular/core';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {

  // i18n Select
  public name: string = 'Brian';
  public gender: 'male' | 'female' = 'male';

  public invitationMap = {
    'male': 'invitarlo',
    'female': 'invitarla'
  };

  public changeClient(): void {
    this.name = 'Candela';
    this.gender = 'female';

    setTimeout(() => {
      this.name = 'Brian';
      this.gender = 'male';
    }, 2000);
  }

  // i18nPlural

  public clients: string[] = ['Brian', 'Candela', 'Noah', 'Tiziano', 'Claudia', 'Gustavo'];

  public clientsMap = {
    '=0': 'no tenemos ningun clienete esperando',
    '=1': 'tenemos un cliente esperando',
    'other': 'tenemos # clientes esperando',
  }


  public deleteClient(): void {
    this.clients.shift();
  }

}
