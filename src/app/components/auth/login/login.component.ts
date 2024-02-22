import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/interfaces/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public static token: string;
  accessLogin: FormGroup;
  login: Login | undefined;

  rememberMe: boolean = true;
  hidePassword: boolean = true;

  constructor(
    private formLogin: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.accessLogin = this.formLogin.group({
      mail: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // ---------------------------------------------------- ACCESS
  onSubmit() {
    if (this.accessLogin.valid) {
      const email = this.accessLogin.get('mail')?.value;
      const password = this.accessLogin.get('password')?.value;

      if (email.endsWith('@gmail.com')) {
        const login: Login = { mail: email, password: password };

        this._userService.postLogin(login).subscribe(
          (data) => {
            LoginComponent.token = data.token;
            this.toastr.success('¡Bienvenido!', 'Acceso');
            this.router.navigate(['/dashboard', data.idUser]);
          },
          (error) => {
            this.toastr.error('Crea una cuenta', 'Error');
            console.log(error);
          }
        );
      } else {
        this.toastr.error('Por favor, utiliza una dirección de correo electrónico de Gmail', 'Error');
      }
    }
  }


  // ---------------------------------------------------- VER O NO PASSWORD
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    const passwordField = document.getElementById('inputChoosePassword');
    if (passwordField) {
      passwordField.setAttribute(
        'type',
        this.hidePassword ? 'password' : 'text'
      );
    }
  }
}
