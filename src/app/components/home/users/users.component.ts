import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  showTable: boolean = true;
  showForm: boolean = false;
  constructor( private toastr: ToastrService){};
  newUser: any = { // Nuevo objeto para representar un usuario en el formulario
    email: '',
    password: '',
    firstName: '',
    surName: '',
    dni: '',
    birthDate: null,
    gender: false
  };
  users: any[] = [
    { id: 1, dni: '77777777', name: 'jheyson jhair', lastName: 'Arone Angeles',email:'jhair@gmail.com',gender:"M" },
    { id: 2, dni: '77777777', name: 'rubi floerelia', lastName: 'damian ochoa',email:'rbi@gmail.com',gender:"M" },
    { id: 3, dni: '77777777', name: 'ed nativido', lastName: 'soto huamanhorcco',email:'ed@gmail.com',gender:"M" },
    { id: 4, dni: '77777777', name: 'otro otro', lastName: 'otro otro',email:'otro@gmail.com',gender:"M" },
    { id: 5, dni: '77777777', name: 'otro2 otr2', lastName: 'otro2 otro2',email:'otro2@gmail.com',gender:"M" },
    { id: 6, dni: '77777777', name: 'otro otro', lastName: 'otro otro',email:'otro@gmail.com',gender:"M" },
    { id: 7, dni: '77777777', name: 'otro2 otr2', lastName: 'otro2 otro2',email:'otro2@gmail.com',gender:"M" },
  ];

  deleteUser(user: any): void {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
  viewUser(user: any): void {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
  editUser(user: any): void {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
  registerUser(): void {
    this.showTable = false;
    this.showForm = true;
    this.toastr.success('Registro completo!', 'Estudiante Registrado');
  }
  onSubmit(): void {

    console.log('Nuevo usuario registrado:', this.newUser);
    this.showTable = true;
    this.showForm = false;

  }
}
