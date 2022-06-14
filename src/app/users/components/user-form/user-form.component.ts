import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/interfaces/user.interface';

interface Rol {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  userForm: FormGroup

  userToEdit!: User | null;
  users!: User[];

  roles: Rol[] = [{ value: 'admin', viewValue: 'Administrador' }, { value: 'user', viewValue: 'Usuario' }];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      checkpass: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      rol: ['', [Validators.required]],
    }, { validator: this.checkPassword });
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.userService.getUserToEdit().subscribe((res) => {
        this.userToEdit = res;
        if (this.userToEdit) {
          this.userForm.get('name')?.patchValue(this.userToEdit.name)
          this.userForm.get('lastname')?.patchValue(this.userToEdit.lastname)
          this.userForm.get('username')?.patchValue(this.userToEdit.username)
          this.userForm.get('rol')?.patchValue(this.userToEdit.rol)
        }
      })
    );
    this.subscriptions.add(
      this.userService.getUsers().subscribe((res) => {
        this.users = res;
      })
    );

  }

  onSubmit() { //Evalua si el elemento es nuevo o a editar y luego envía al service los datos.
    let usr: User;
    let isToEdit: boolean;
    if (this.userToEdit) { //Editamos un usuario existente
      let indexOfUser = this.userToEdit.id
      this.userForm.value['id'] = indexOfUser;
      isToEdit = true;
    } else { //Agregamos un nuevo usuario
      this.userForm.value['id'] = this.users.length + 1;
      isToEdit = false;
    }
    usr = this.userForm.value;
    this.userService.setUsers(usr, isToEdit)
      .then((res) => {
        this._snackBar.open(res.message, 'Ok')
        this.router.navigate(['dashboard/users'])
      })
      .catch((res) => {
        this._snackBar.open(res.message, 'Cerrar')
      })
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls.password?.value
    const checkpass = group.controls.checkpass?.value
    return pass === checkpass ? null : { notSame: true }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
