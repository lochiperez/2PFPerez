import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from 'src/app/shared/interfaces/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentsData: Student[] = [ //Datos de los estudiantes
    { id: 1, name: 'Rodrigo', lastname: 'Perez', cursos: [{ id: 1, course: 'Angular' }, { id: 3, course: 'VueJS' }] },
    { id: 2, name: 'Victoria', lastname: 'Larraya', cursos: [{ id: 2, course: 'React' }, { id: 4, course: 'Node-JS' }] },
    { id: 3, name: 'Sol', lastname: 'Marin', cursos: [{ id: 6, course: 'Java' }, { id: 5, course: 'Python' }] }
  ];

  studentToEdit!: Student | null;


  getStudents(): Observable<Student[]> {
    return of(this.studentsData);
  }

  setStudents(students: Student[]): Promise<any> {
    return new Promise((resolve, reject) => {
      if (students.length > 0 || students !== null) {
        this.studentsData = students;
        return resolve({ message: 'Se actualizo la información de los estudiantes correctamente' })
      } else {
        reject({ message: 'No se pudo actualizar la informacion de los estudiantes' })
      }
    });
  }

  getStudentToEdit(): Observable<Student | null> {
    return of(this.studentToEdit);
  }

  setStudentToEdit(student: Student | null) {
    return new Promise((resolve, reject) => {
      if (student || student === null) {
        this.studentToEdit = student;
        return resolve(true)
      } else {
        return reject({ message: 'No se pudo setear el studentToEdit' })
      }

    });
  }


}

