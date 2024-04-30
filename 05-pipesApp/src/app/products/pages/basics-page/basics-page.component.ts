import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrl: './basics-page.component.css'
})
export class BasicsPageComponent {

  public nameLower: string = 'brian';
  public nameUpper: string = 'BRIAN';
  public fullName: string = 'bRiAn chIaStElLiNo';
  public customDate: Date = new Date();

}
