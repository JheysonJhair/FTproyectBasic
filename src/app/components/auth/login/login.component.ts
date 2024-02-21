import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = 'usuario@gmail.com';
  password: string = 'contraseña';
  rememberMe: boolean = true;
  hidePassword: boolean = true;
  constructor(private router: Router) {}

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Contraseña:', this.password);
    console.log('Recuérdame:', this.rememberMe);

    if (this.email === 'usuario@gmail.com' && this.password === 'contraseña') {
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Credenciales incorrectas');
    }
  }


  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    const passwordField = document.getElementById('inputChoosePassword');
    if (passwordField) {
      passwordField.setAttribute('type', this.hidePassword ? 'password' : 'text');
    }
  }
}
