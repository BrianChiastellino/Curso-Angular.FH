import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../../interfaces/hero.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirmDialog.component.html',
  styles: ''
})

export class ConfirmDialogComponent {

  /*
    * this.dialog.close() es lo que va devolver nuestro dialog al componenete que lo llamo,
      el tipo de dato es ' any ' asi que podemos devolver cualquier cosa.

  */


  constructor(
    public dialogref: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero,
  ) { }

  onNoClick(): void {
    this.dialogref.close(false);
  }

  onConfirm(): void {
    this.dialogref.close(true);
  }

}
