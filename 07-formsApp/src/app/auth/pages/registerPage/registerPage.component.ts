import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CustomValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validatores.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './registerPage.component.html',

})
export class RegisterPageComponent {


  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatoresService.firstNameAndLastnamePattern)]],
    // email: ['', [Validators.required, Validators.pattern(this.validatoresService.emailPattern)], [new EmailValidatorService()] ],
    email: ['', [Validators.required, Validators.pattern(this.validatoresService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatoresService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6),]],
    password2: ['', [Validators.required]],
  },

  // Aqui abajo podemos poner una validacion en general, si no pasa, el formulario  es inavlid.
    {
      validators:[
        this.validatoresService.isFieldEqualFieldTwo( 'password', 'password2' ),
      ]
    }
  )

  constructor(
    private fb: FormBuilder,
    private validatoresService: ValidatorsService,
    private emailValidator: EmailValidatorService
  ) { }

  isValidField(field: string) {
    return this.validatoresService.isValidField(this.myForm, field);
  }

  onSubmit(): void {
    this.myForm.markAllAsTouched();

  }


}
