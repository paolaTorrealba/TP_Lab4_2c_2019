import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import {Router } from '@angular/router';
import { AuthProvider } from 'src/app/providers/auth';
import { Perfil } from 'src/app/clases/enum';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
 
  @ViewChild("imgUsuario", { static: false }) InputImagenUser: ElementRef;


  public imgName: string;
  public nombreModel: string;
  public apellidoModel: string
  public dniModel: string;
  public claveModel:string;  
  public emailModel: string;
  public usuario: any;
  public passwordModel: string;
  public captchaVerificado: boolean;
  public accepted: boolean;
  public porcentajeUpload: Observable<number>;
  public urlImagen: Observable<string>;
  public noCargando = true;
  public imagenUrl : any;
  public foto:string;


  constructor(private auth: AuthProvider, 
     private storage: AngularFireStorage,
     private router: Router) {

    this.imgName = "Seleccionar imágen..";
    this.usuario = this.auth.usuarioVacio();
    this.captchaVerificado = false;
  }

  ngOnInit() { }

  registrarse() {
    console.log("registro")
    this.imagenUrl = this.InputImagenUser.nativeElement.value;
    if (!this.imagenUrl ) {
      this.imagenUrl = "assets/imagenes/default-user.png";
    }
    let data = {
          'nombre':this.nombreModel,
          'apellido': this.apellidoModel,
          'foto': this.imagenUrl,
          'perfil':Perfil.cliente,
          'activo': false,
          'logueado': false,
          'correo': this.emailModel,
          'clave':this.passwordModel
    }
    console.log("data ",data)
    this.auth.guardarUsuario(data);
    this.auth.crearUsuario(this.emailModel,this.passwordModel);
    this.router.navigate(['/principal']);
  }
 

  ImagenCargada(e) {
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
    this.nombreModel = "cliente1";
    this.apellidoModel = "cliente";
    this.emailModel = "cliente1@cliente.com";
    this.passwordModel = "123456";
    this.accepted = true;
  }

  
}