import { Component, OnInit, ViewChild, ElementRef, ɵConsole } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthProvider } from 'src/app/providers/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
 
  @ViewChild("imgUsuario", { static: false }) InputImagenUser: ElementRef;

  perfil;
  imgName: string;
  nombreModel: string;
  apellidoModel: string
  dniModel: string;
  claveModel:string;
  perfilModel: any;
  usuario: any;
  emailModel: string;
  passwordModel: string;
  captchaVerificado: boolean;
  accepted: boolean;
  porcentajeUpload: Observable<number>;
  public urlImagen: Observable<string>;
  noCargando = true;
  imagenUrl : any;
  foto:string;


  constructor(private auth: AuthProvider, private storage: AngularFireStorage, private elRef: ElementRef) {
    this.imgName = "Seleccionar imágen..";
    this.usuario = this.auth.usuarioVacio();
    this.captchaVerificado = false;
  }

  ngOnInit() { }

  registrarse() {
    console.log("registro")
    // this.usuario.perfil = this.auth.perfil[(<HTMLInputElement>document.getElementById("perfil")).value];

    // if (this.usuario.perfil == this.auth.empleado) {
    //   this.usuario.perfil = this.auth.actividad[(<HTMLInputElement>document.getElementById("actividad")).value];
    // }

    // this.usuario.correo = this.emailModel;
    // this.usuario.nombre = this.emailModel;
    // this.usuario.apellido = this.emailModel;
    // this.usuario.dni = this.emailModel;
    // this.usuario.clave = this.emailModel;
    // this.usuario.foto = this.emailModel;
    this.imagenUrl = this.InputImagenUser.nativeElement.value;
    if (!this.imagenUrl ) {
      this.imagenUrl = "assets/imagenes/default-user.png";
    }

      let data = {
      'nombre':this.nombreModel,
      'apellido': this.apellidoModel,
      'foto': this.urlImagen,
      'perfil': 'cliente',
      'activo': false,
      'logueado': false,
      'correo': this.emailModel,
      'clave':this.claveModel
  }

  console.log("")
    this.auth.guardarUsuario(data);
  }

  ImagenCargada(e) {
    console.log("cargar imagen")
    this.noCargando = false;
    const img = e.target.files[0];

    if (img != undefined) {
      this.imgName = img.name;
      const nombreImg = img.name.substr(0, img.name.lastIndexOf('.'));
      const ext = img.name.substr(img.name.lastIndexOf('.') + 1);
      const filePath = "imagenes/usuarios/" + nombreImg + "-" + Date.now() + "." + ext;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, img);
      this.porcentajeUpload = task.percentageChanges();
    
      task.snapshotChanges().pipe(finalize(() => this.urlImagen = ref.getDownloadURL())).subscribe();
      console.log("imagen: ", this.urlImagen);
    }
    else {
      this.imgName = "Seleccionar imágen..";
      this.urlImagen = empty();
      this.noCargando = true;
    }
  }

  resolved(captchaResponse: string) {
    this.captchaVerificado = true;
  }

  crearTest() {
    this.nombreModel = "cliente";
    this.emailModel = "cliente@gmail.com";
    this.passwordModel = "cliente";
    this.accepted = true;
  }

  changePerfil(perfil) {
    this.perfil = perfil;
  }
}