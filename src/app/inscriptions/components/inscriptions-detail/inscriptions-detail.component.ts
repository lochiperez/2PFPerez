import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from 'src/app/core/services/student.service';
import { UserService } from 'src/app/core/services/user.service';
import { Courses } from 'src/app/shared/interfaces/course.interface';
import { Student } from 'src/app/shared/interfaces/student.interface';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-inscriptions-detail',
  templateUrl: './inscriptions-detail.component.html',
  styleUrls: ['./inscriptions-detail.component.scss']
})
export class InscriptionsDetailComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  user!:User | null; //Datos del usuario logueado

  @ViewChild('table') table!: MatTable<any>;

  student!: Student; //Estudiante a mostrar detalles
  studentsData!: Student[]; //Listado de estudiantes

  displayedColumns = ['id', 'name', 'actions'];
  //dataSource = new MatTableDataSource(this.student.cursos!);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private studentService: StudentService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getStudents();
    this.getStudentDetails();
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
      this.studentService.getStudents().subscribe((data: Student[]) => {
        this.studentsData = data
      })
    )
  }

  getStudentDetails() {
    let id:number = parseInt(this.route.snapshot.paramMap.get('id') as string);
    let studentData = this.studentsData.find((student) => student.id === id)
    if(studentData) {
      this.student = studentData;
    }
    else {
      this._snackBar.open('No se pudo recuperar la información del estudiante', 'Cerrar');
      this.router.navigate(['dashboard/inscriptions']);
    }
  }

  onClickAdd() {
    this.studentService.setStudentToEdit(this.student)
    .then(() => this.router.navigate(['dashboard/inscriptions/addinscription']))
    .catch((error) => this._snackBar.open(error.message, 'Cerrar'))
  }

  onClickDetails(course: Courses) {
    this.router.navigate([`dashboard/courses/${course.id}`])
  }

  onDeleteInscription(course: Courses) {
    /* Se busca el elemento por el id del curso en el array de cursos del estudiante,
    Se elimina por el index, y luego usando el ViewChild, se renderiza de nuevo la tabla.
    Por ultimo, se actualiza el estudiante en el listado de estudiantes y se setean en el servicio*/
    let courses: Courses[] = this.student.cursos!;
    let index = courses.findIndex((x) => x.id === course.id);
    courses.splice(index,1);
    this.table.renderRows();
    this.student.cursos = courses;
    this.updateStudent();
    this.studentService.setStudents(this.studentsData)
    .then((res) => this._snackBar.open(res.message, 'Ok'))
    .catch((error) => this._snackBar.open(error.message, 'Cerrar'));
  }

  updateStudent() {
    let indexOfStudent = this.studentsData.findIndex((x) => x.id === this.student.id);
    this.studentsData[indexOfStudent] = this.student;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
