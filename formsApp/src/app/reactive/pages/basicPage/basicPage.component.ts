import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basicPage.component.html',
})

export class BasicPageComponent implements OnInit {

  /**
   * myFormAux y myForm son dos maneras iguales en trabajar con formularios reactivos
   */


  public myFormAux: FormGroup = new FormGroup({

    name: new FormControl('', [], []),
    price: new FormControl(0, [], []),
    storage: new FormControl(0, [], []),

  });

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm.reset(this.myForm);
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string,): string | null {

    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {

      switch (key) {
        case 'required':
          return 'Este campo es requerido'

        case 'minlength':
          return `Minimo ${errors['minlength'].requieredLength} caracteres `
      }


    }

    return null;

  }

  /**
   * this.myForm.markAllAsTouched() ---> Esta funcion, simula como si los campos hubiesen sido tocados,
   * por ende sale la adevertencia del html.
   *
   */

  public onSave(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset(this.myForm);


  }

}
