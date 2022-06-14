import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../core/services/user.service';
import { User } from '../shared/interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  userData!: User | null; //datos del usuario logueado

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.subscriptions.add(
      this.userService.getUserData().subscribe((userData) => {
        this.userData = userData;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
