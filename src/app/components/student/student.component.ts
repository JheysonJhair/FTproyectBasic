import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  listEstudiantes: any[] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _studentService: StudentService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
   }

  ngOnInit(): void {
    this.obtenerEstudiantes();
  }

  obtenerEstudiantes() {
    this._studentService.getListStudents().subscribe(data => {
      console.log(data);
      this.listEstudiantes = data;
    }, error => {
      console.log(error);
    })
  }

  guardarEstudiante() {
    const estudiante: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    if(this.id == undefined) {
      // Agregamos una nueva tarjeta
        this._studentService.saveStudent(estudiante).subscribe(data => {
          this.toastr.success('El estudiante fue registrada con exito!', 'Estudiante Registrado');
          this.obtenerEstudiantes();
          this.form.reset();
        }, error => {
          this.toastr.error('Opss.. ocurrio un error','Error')
          console.log(error);
        })
    }else {

      estudiante.id = this.id;
      // Editamos tarjeta
      this._studentService.updateStudent(this.id, estudiante).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('El estudiante fue actualizada con exito!', 'Estudiante Actualizado');
        this.obtenerEstudiantes();
      }, error => {
        console.log(error);
      })
    } 
  }

  eliminarEstudiante(id: number) {
    this._studentService.deleteStudent(id).subscribe(data => {
      this.toastr.error('La tarjeta fue eliminada con exito!','Tarjeta eliminada');
      this.obtenerEstudiantes();
    }, error => {
      console.log(error);
    })

  }

  editarEstudiante(estudiante: any) {
    this.accion = 'Editar';
    this.id = estudiante.id;

    this.form.patchValue({
      titular: estudiante.titular,
      numeroTarjeta: estudiante.numeroTarjeta,
      fechaExpiracion: estudiante.fechaExpiracion,
      cvv: estudiante.cvv
    })
  }

}
