import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  subscriptions:Subscription = new Subscription();

  user!:User; //Usuario a mostrar los detalles

  usersData!:User[]; //listado de usuarios

  usr!:User | null; //datos del usuario que esta logueado en este momento

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getUsers();
    this.getUserDetails();
  }

  getUsers() {
    this.subscriptions.add(
      this.userService.getUsers().subscribe((users) => {
        this.usersData = users;
      })
    )
  }

  getUserData() {
    this.subscriptions.add(
      this.userService.getUserData().subscribe((userData) => {
        this.usr = userData;
      })
    );
  }

  getUserDetails() { //recuperamos la informacion del usuario solicitado por el id del mismo
    let id:number = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.subscriptions.add(
      this.userService.getUserById(id).subscribe((userData) => {
        this.user = userData
        }, (error) => {
          this._snackBar.open(error.message, 'Cerrar');
          this.router.navigate(['dashboard/users']);
        })
    )
  }

  onClickEdit(){
    this.userService.setUserToEdit(this.user)
    .then(() => {
      this.router.navigate(['dashboard/users/userform']);
    })
    .catch((res) => {
      this._snackBar.open(res.message, 'Cerrar');
    })
  }

  onDeleteuser(){
    /* Se busca el elemento por el id en el array de usuarios,
    Se elimina por el index, y luego usando el ViewChild se renderiza de nuevo la tabla.
    Por ultimo, se actualiza el listado de usuarios en el servicio */
    let indexOfUser = this.usersData.findIndex((usr) => usr.id === this.user.id)
    this.usersData.splice(indexOfUser, 1)
    this.onUpdateDelete(this.usersData)
    this.userService.deleteUser(this.usersData)
    .then((res) => {
      this._snackBar.open(res.message, 'OK')
      this.router.navigate(['dashboard/users']);
    })
    .catch((error) => {
      this._snackBar.open(error.message, 'Cerrar')
    })
  }

  onUpdateDelete(element:any) {
    /* Una vez editado por el delete, 
    se modifican los ids (para evitar errores en delete) y ademas hace un update del valor de data */
    element.forEach((el:any,index:number)=>{
      el['id']=index+1
    })
    this.usersData=element;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
