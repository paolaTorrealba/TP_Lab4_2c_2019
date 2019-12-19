import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataApiService } from './data-api.service';
import { Perfil } from '../clases/enum';
import { NotificationsService } from 'angular2-notifications';




export interface UsuarioInterface {
  Uid: string;
  correo:string,
  foto:string,
  logeado:boolean,
  activo:boolean,
  nombre:string,
  apellido:string,
  clave: string,
  perfil:Perfil
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuario: UsuarioInterface;
  estaLogeado: boolean;
  private redirectUrl: string = '/';
  private loginUrl: string = '/loguearse';
  private incioUrl: string = '';


     constructor(private afsAuth: AngularFireAuth, 
      private db: AngularFirestore,
      private ns: NotificationsService, 
      private router: Router, 
      
       private dataApi: DataApiService) {
       this.usuario = this.usuarioVacio();
  }



usuarioVacio() {
      return {
        Uid: '',
        nombre: '',
        apellido: '',      
        correo: '',      
        logeado: false,
        activo: false,      
        foto: '',
        clave: '',
        perfil: Perfil.cliente
      }
}

RegistrarUsuario(usuario: UsuarioInterface) {
  console.log("registro", usuario)
  return new Promise(() => {
      this.afsAuth.auth.createUserWithEmailAndPassword(usuario.correo, usuario.clave)
          .then(
              (userData) => {
                  return userData.user.updateProfile({
                      displayName: usuario.nombre,
                      photoURL: usuario.foto
                  });
              },
              (err) => {
                  console.log(err);
                  this.usuarioVacio();
                  this.ns.error("Error al registrarse", "Sucedió un error al registrarse, intente nuevamente.");
              }
          )
          .then(
              () => {
                  this.EstaLogeado().pipe(take(1)).subscribe(
                      (userData) => {
                          if (userData) {
                              usuario.clave = '';
                              usuario.Uid = userData.uid;
                              usuario.correo = userData.email;
                              usuario.foto = userData.photoURL;
                              usuario.nombre = userData.displayName;
                              usuario.perfil = usuario.perfil;
                              usuario.activo = true;
                              this.router.navigate(['']);
                              this.db.collection('usuarios').doc(userData.uid).set(usuario).then(() => {
                                  this.DesloguearUsuario();
                              });
                          }
                          else {
                              this.usuarioVacio();
                          }
                      },
                      (err) => {
                          console.log(err);
                          this.usuarioVacio();
                          this.ns.error("Error inesperado", "Sucedió un error inesperado.");
                      });
              });
  });
}


loguearUsuario(email: string, password: string) {
  return new Promise(() => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, password)
          .then(
              (userData) => {
                  if (userData) {                    
                      this.dataApi.TraerUno(userData.user.uid, 'usuarios').pipe(take(1)).subscribe(userx => {
                          if (!userx.activo) {                           
                              this.DesloguearUsuario();
                          }
                          else {                              
                              if (userx.perfil == Perfil.socio || userx.perfil == Perfil.cliente) {
                                console.log ("el usuario: ", userx, "es:", userx.perfil) 
                                var today = new Date();
                                  var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

                                  var today = new Date();
                                  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                                  var estEmpl = {
                                      usuario: userx.nombre,
                                      dia: date,
                                      horario: time,
                                      datetime: Date.now()
                                  }

                                  this.dataApi.AgregarUno(estEmpl, 'logs');
                              }

                              this.usuario.Uid = userx.Uid;
                              this.usuario.correo = userx.correo;
                              this.usuario.foto = userx.foto;
                              this.usuario.nombre = userx.nombre;
                              this.usuario.perfil = userx.perfil;
                              this.router.navigate(['/principal']);
                          }
                      });
                  }
                  else {
                      this.usuario = this.usuarioVacio();
                  }
              },
              (err) => {
                  console.log(err);
                  this.usuario = this.usuarioVacio();
                  this.ns.error("Error al loguearse", "La cuenta es inexistente.");
              });
  });
}
DesloguearUsuario() {
  this.usuario = this.usuarioVacio();
  this.afsAuth.auth.signOut();
}

EstaLogeado() {
  return this.afsAuth.authState.pipe(map(auth => auth));
}



isUserLoggedIn(): boolean {
  return this.estaLogeado;
}
setRedirectUrl(url: string): void {
  this.redirectUrl = url;
}
getLoginUrl(): string {
  return this.loginUrl;
}
getInicioUrl(): string {
  return this.incioUrl;
}

Estadologueo() {
  console.log("estado de logueo: ")

  this.afsAuth.auth.onAuthStateChanged(
      (user) => {
          if (user) {
            console.log("estado de logueo: ",user)
              this.dataApi.TraerUno(user.uid, 'usuarios').pipe(take(1)).subscribe(userx => {
                  this.usuario = userx;
              });

              this.estaLogeado = true;
          }
          else
              this.estaLogeado = false;
      },
      () => {
          this.estaLogeado = false;
      }
  );
}

}
