import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  accion = 'REGISTRAR';
  idLogin: string;
  id: string;

  registerForm: FormGroup;
  user: User | undefined;
  dataForm: User | undefined;

  showTable: boolean = true;
  showForm: boolean = false;

  listUsers: User[] = [];
  constructor(
    private formLogin: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService,
    private datePipe: DatePipe
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
    this.idLogin = this.aRoute.snapshot.paramMap.get('idLogin')!;
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.esEdit();
  }

  //----------------------------------------------------------------- GET USERS
  getAllUsers() {
    this._userService.getListUser().subscribe(
      (data) => {
        this.listUsers = data.listDtoUser;
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }

  //----------------------------------------------------------------- DELETE USER
  deleteUser(id: any) {
    this._userService.deleteUser(id).subscribe(
      (data) => {
        this.getAllUsers();
        this.toastr.error(
          'El usuarios fue eliminado con exito',
          'Registro eliminado!'
        );
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
  //---------------------------------------------------------------EDIT - REGISTER
  esEdit() {
    if (this.id !== null) {
      this.registerUser();
      this.accion = 'EDITAR';
      this._userService.getUserById(this.id).subscribe(
        (data) => {
          this.user = data.dtoUser;

          const formattedBirthDate = this.datePipe.transform(data.dtoUser.birthDate, 'yyyy-MM-dd');
          this.registerForm.controls['mail'].setValue(data.dtoUser.mail);
          this.registerForm.controls['dni'].setValue(data.dtoUser.dni);
          this.registerForm.controls['firstName'].setValue(data.dtoUser.firstName);
          this.registerForm.controls['surName'].setValue(data.dtoUser.surName);
          this.registerForm.controls['password'].setValue(data.dtoUser.password);
          this.registerForm.controls['birthDate'].setValue(formattedBirthDate);
          this.registerForm.controls['gender'].setValue(data.dtoUser.gender);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  addEditUser() {
    if (this.user == undefined) {
      let userData = {
        dni: this.registerForm.get('dni')?.value,
        mail: this.registerForm.get('mail')?.value,
        firstName: this.registerForm.get('firstName')?.value,
        surName: this.registerForm.get('surName')?.value,
        password: this.registerForm.get('password')?.value,
        birthDate: this.registerForm.get('birthDate')?.value,
        gender: this.registerForm.get('gender')?.value === 'true'
      };
      this._userService.saveUser(userData).subscribe(
        (data) => {
          this.toastr.success(
            'El usuario fue registrado con exito',
            'Registro completo!'
          );
          this.showTable = true;
          this.showForm = false;
          this.router.navigate(['dashboard/' + this.id]);
        },
        (error) => {
          // this.toastr.error('Opss ocurrio un error', 'Error');
          // console.log(error);
        }
      );
    }
    if (this.id !== null) {
      let formData = new FormData();
      formData.append('idUser', this.id);
      formData.append('mail', this.registerForm.get('mail')?.value);
      formData.append('dni', this.registerForm.get('dni')?.value);
      formData.append('firstName', this.registerForm.get('firstName')?.value);
      formData.append('surName', this.registerForm.get('surName')?.value);
      formData.append('password', this.registerForm.get('password')?.value);
      formData.append('birthDate', this.registerForm.get('birthDate')?.value);
      formData.append('gender', this.registerForm.get('gender')?.value);

      this._userService.updateUser(formData).subscribe(
        (data) => {
          this.toastr.info(
            'El estudiante fue actualizado con exito',
            'Estudiante actualizado!'
          );
          this.showTable = true;
          this.showForm = false;
          this.router.navigate(['dashboard/' + this.id]);
        },
        (error) => {
          this.toastr.error('Opss ocurrio un error', 'Error');
          console.log(error);
        }
      );
    }
  }

  //---------------------------------------------------------------EDIT - REGISTER

  registerUser(): void {
    this.showTable = false;
    this.showForm = true;
  }

  reloadPage(): void {
    window.location.reload();
  }
}
