import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from 'src/app/core/services/student.service';
import { UserService } from 'src/app/core/services/user.service';
import { Student } from 'src/app/shared/interfaces/student.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { map } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  @ViewChild('table') table!: MatTable<any>;

  user!: User | null;

  studentsData!: Student[];

  displayedColumns = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource(this.studentsData);

  constructor(
    private userService: UserService,
    private studentService: StudentService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getStudents();
  }

  getUserData() {
    this.subscriptions.add(
      this.userService.getUserData().subscribe((userData) => {
        this.user = userData;
      })
    );
  }

  getStudents() {
    this.subscriptions.add(
      this.studentService.getStudents()
        .pipe(
          map((students) => {
            students.forEach(student => {
              student.lastname = student.lastname.toUpperCase();
            });
            return students
          })
        )
        .subscribe((data: Student[]) => {
          this.studentsData = data
        })
    )
  }

  onClickDetails(student: Student) {
    this.router.navigate([`dashboard/students/${student.id}`])
  }

  onDeleteStudent(el: any) {
    /* Se busca el elemento por el id en el array de estudiantes,
    Se elimina por el index, y luego usando el ViewChild, se renderiza de nuevo la tabla.
    Por ultimo, se actualiza el listado de estudiantes en el servicio */
    let index = this.studentsData.findIndex((student) => student.id === el.id);
    this.studentsData.splice(index, 1);
    this.table.renderRows()
    this.onUpdateDeleteStudents(this.studentsData)
    this.studentService.setStudents(this.studentsData)
      .then((res) => {
        this._snackBar.open(res.message, 'Ok');
      })
      .catch((error) => this._snackBar.open(error.message, 'Cerrar'));
  }

  onClickAdd() {
    this.studentService.setStudentToEdit(null)
      .then(() => this.router.navigate(['dashboard/students/studentform']))
      .catch((error) => this._snackBar.open(error.message, 'Cerrar'))
  }

  onClickEdit(student: Student) { //Actualiza el estudiante a editar en el servicio
    student.lastname = student.lastname[0] + student.lastname.slice(1).toLowerCase(); //Vuelve a dejar el apellido en PascalCase
    this.studentService.setStudentToEdit(student)
      .then(() => { //Se actualizo en el servicio el studentToEdit
        this.router.navigate(['dashboard/students/studentform']);
      })
      .catch((error) => {
        this._snackBar.open(error.message, 'Cerrar');
      });
  }

  onUpdateDeleteStudents(element: any) {
    /* Una vez editado por el delete, 
    se modifican los ids (para evitar errores en delete) y ademas hace un update del valor de data */
    element.forEach((el: any, index: number) => {
      el['id'] = index + 1
    })
    this.studentsData = element;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
