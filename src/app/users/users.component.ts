import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UserService } from "../core/services/user.service";


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
  })

  export class UsersComponent implements OnInit {

    subscriptions:Subscription = new Subscription();

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
      this.isLoggedIn();  
    }

    isLoggedIn() {
        this.subscriptions.add(
          this.userService.getIsLoggedIn().subscribe((res) => {
            if(!res) {
              this.router.navigate(['/']);
            }
          })
        );
      }

   }