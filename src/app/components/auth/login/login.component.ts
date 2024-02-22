import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private aRoute: ActivatedRoute,
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

  // ---------------------------------------------------- GET ADMIN AND STUDENT
  getUserById(id: string) {
    this._userService.getUserById(id).subscribe((data) => {
      this.login = data;
    });
  }

  // ---------------------------------------------------- ACCESS
  onSubmit() {
    if (this.accessLogin.valid) {
      const login: Login = {
        mail: this.accessLogin.get('mail')?.value,
        password: this.accessLogin.get('password')?.value,
      };
      console.log('Datos a enviar:', login);
      this.router.navigate(['/dashboard', 12]);
      // if (login.mail?.endsWith('@gmail.com')) {
      //   this._userService.postLogin(login.mail, login.password).subscribe(
      //     (data) => {
      //       this.getUserById(data.idStudent);

      //       LoginComponent.token = data.token;
      //       this.toastr.success('Bienvenido!', 'Acceso!');
      //       this.router.navigate(['/dashboard', data.id]);
      //     },
      //     (error) => {
      //       this.toastr.error('Create una cuenta!', 'Error');
      //       console.log(error);
      //     }
      //   );
      // }
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
