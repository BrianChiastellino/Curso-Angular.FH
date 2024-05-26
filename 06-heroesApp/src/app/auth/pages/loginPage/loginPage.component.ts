import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './loginPage.component.html',
})
export class LoginPageComponent {

  constructor(private authService: AuthService,
    private router: Router,
  ) { }


  onLogin(): void {
    this.authService.login(' ', ' ').subscribe(user => {
      this.router.navigateByUrl('/heroes/list')
    })
  }


}
