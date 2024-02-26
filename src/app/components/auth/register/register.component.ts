import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  user: User | undefined;

  hidePassword: boolean = true;
  terminate: boolean = true;

  constructor(
    private formLogin: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.formLogin.group({
      mail: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
        ],
      ],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      firstName: ['', [Validators.required, Validators.maxLength(70)]],
      surName: ['', [Validators.required, Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      birthDate: ['', Validators.required],
      gender: [true, Validators.required],
    });
  }

  // ---------------------------------------------------- REGISTER
  addUser() {
    if (this.user == undefined) {
      let userData = {
        dni: this.registerForm.get('dni')?.value,
        mail: this.registerForm.get('mail')?.value,
        firstName: this.registerForm.get('firstName')?.value,
        surName: this.registerForm.get('surName')?.value,
        password: this.registerForm.get('password')?.value,
        birthDate: this.registerForm.get('birthDate')?.value,
        gender: this.registerForm.get('gender')?.value === 'true',
      };
      this._userService.saveUser(userData).subscribe(
        (data) => {
          if (data.message == 'Ya existe un usuario creado con ese correo') {
            this.toastr.error(
              'Ya existe un usuario creado con ese correo',
              'Error'
            );
          } else if (
            data.message == 'Ya existe un usuario creado con ese dni'
          ) {
            this.toastr.error(
              'Ya existe un usuario creado con ese dni',
              'Error'
            );
          } else {
            if (data.success == true) {
              this.toastr.success(
                'El usuario fue registrado con exito',
                'Registro completo!'
              );
              this.router.navigate(['login/']);
            } else {
              this.toastr.error('Opss ocurrio un error', 'Error');
            }
          }
        },
        (error) => {
          this.toastr.error('Opss ocurrio un error', 'Error');
          console.log(error);
        }
      );
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
