import { Injectable } from '@angular/core';
import { Observable, Observer, of, throwError } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn: boolean = false;
  //isLoggedIn:boolean = true;

  users: User[] = [{
    id: 1,
    username: 'admin',
    name: 'Rodrigo',
    lastname: 'Perez',
    password: 'admin',
    rol: 'admin'
  }, {
    id: 2,
    username: 'user',
    name: 'Sol',
    lastname: 'Perez',
    password: 'user',
    rol: 'user'
  },];

  userData!: User | null;
  usersData: User[] = [];
  userToEdit!: User | null;


  getUsers(): Observable<User[]> { //Devuelve un array de los usuarios y sus roles
    this.usersData = [];
    this.users.forEach(user => {
      let userData = {
        id: user.id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        rol: user.rol
      }
      this.usersData.push(userData)
    });
    return of(this.usersData)
  }

  getIsLoggedIn(): Observable<boolean> {
    return of(this.isLoggedIn)
  }

  logOff() {
    this.isLoggedIn = false;
  }

  checkLogin(username: string, password: string): Observable<boolean> {
    let user = this.users.find((usr) => usr.username === username)
    if (user && user.password === password) {
      this.isLoggedIn = true;
      this.userData = {
        id: user.id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        rol: user.rol
      }
      return of(this.isLoggedIn);
    } else {
      this.isLoggedIn = false;
      this.userData = null;
      return of(this.isLoggedIn)
    }
  }

  getUserData(): Observable<User | null> {
    return of(this.userData);
  }

  getUserById(id: number): Observable<User> {
    let user = this.users.find((usr) => usr.id === id)
    if (user) {
      let userData = {
        id: user.id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        rol: user.rol
      }
      return of(userData)
    } else {
      return throwError({ message: 'El usuario no existe' })
    }
  }

  getUserToEdit(): Observable<User | null> {
    return of(this.userToEdit);
  }

  setUserToEdit(user: User | null): Promise<any> {
    return new Promise((resolve, reject) => {
      if (user || user === null) {
        this.userToEdit = user;
        return resolve(true)
      } else {
        return reject({ message: 'No se pudo setear el userToEdit' })
      }
    })
  }

  setUsers(user: User, isToEdit: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.users.length > 0 || this.users !== null) {
        if (isToEdit) {
          let indexOfUser = this.users.findIndex((usr) => usr.id === user.id);
          this.users[indexOfUser] = user;
        } else {
          this.users.push(user);
        }
        return resolve({ message: 'Se agrego la información del usuario' })
      } else {
        return reject({ message: 'No se pudo actualizar la información de los usuarios' })
      }
    })
  }

  deleteUser(usersData: User[]): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.users.length > 0) {
        this.users = usersData;
        return resolve({ message: 'Usuario eliminado' })
      } else {
        return reject({ message: 'No se pudo eliminar el usuario' })
      }
    })
  }

  getTime(): Observable<string> {
    return new Observable<string>((observer: Observer<string>) => {
      setInterval(() => observer.next(new Date().toString()), 1000);
    });
  }
}
