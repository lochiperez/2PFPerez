import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from 'src/app/core/services/student.service';
import { Student } from 'src/app/shared/interfaces/student.interface';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss']
})
export class StudentsFormComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  studentForm: FormGroup;

  studentToEdit!: Student | null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
    })
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.studentService.getStudentToEdit().subscribe((student) => {
        this.studentToEdit = student;
      })
    );
    if (this.studentToEdit) {
      this.studentForm.get('name')?.patchValue(this.studentToEdit.name)
      this.studentForm.get('lastname')?.patchValue(this.studentToEdit.lastname)
    }
  }

  onSubmit() {
    let students: Student[] = [];
    this.subscriptions.add(
      this.studentService.getStudents().subscribe((studentsData) => {
        students = studentsData
      })
    );
    let index = 1;
    if (students.length > 0 && !this.studentToEdit) { // si agregamos un alumno nuevo
      index = students.length + 1;
      this.studentForm.value['id'] = index;
      this.studentForm.value['cursos'] = [];
      students.push(this.studentForm.value);
    } else if (students.length === 0) { // si es el primer alumno
      this.studentForm.value['id'] = index;
      this.studentForm.value['cursos'] = [];
      students.push(this.studentForm.value);
    }

    if (this.studentToEdit) { // si estamos editando un alumno existente
      let indexOfStudent = students.findIndex((student) => student.id === this.studentToEdit!.id);
      this.studentForm.value['id'] = this.studentToEdit.id;
      this.studentForm.value['cursos'] = this.studentToEdit.cursos;
      students[indexOfStudent] = this.studentForm.value;
    }
    this.studentService.setStudents(students)
      .then((res) => {
        this._snackBar.open(res.message, 'Ok');
        this.router.navigate(['dashboard/students']);
      })
      .catch((error) => this._snackBar.open(error.message, 'Cerrar'));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
