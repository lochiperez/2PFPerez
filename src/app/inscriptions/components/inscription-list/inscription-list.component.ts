import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from 'src/app/core/services/student.service';
import { UserService } from 'src/app/core/services/user.service';
import { Student } from 'src/app/shared/interfaces/student.interface';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-inscription-list',
  templateUrl: './inscription-list.component.html',
  styleUrls: ['./inscription-list.component.scss']
})
export class InscriptionListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

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
      this.studentService.getStudents().subscribe((data: Student[]) => {
        this.studentsData = data
      })
    )
  }

  onClickDetails(student: Student) {
    this.router.navigate([`dashboard/inscriptions/${student.id}`]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
