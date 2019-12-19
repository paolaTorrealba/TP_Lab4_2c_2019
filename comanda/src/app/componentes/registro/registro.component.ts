import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { finalize, delay } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import {Router } from '@angular/router';
import { AuthProvider } from 'src/app/providers/auth';
import { Perfil } from 'src/app/clases/enum';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
 
  @ViewChild("imgUsuario", { static: false }) InputImagenUser: ElementRef;
  
  public nombreModel: string;
  public apellidoModel: string
  public dniModel: string;
  public claveModel:string;  
  public emailModel: string;
  public usuario: any;
  public passwordModel: string;
  public captchaVerificado: boolean;
  public accepted: boolean;
  public cargoImagen:boolean;
  public noCargando = true;
  public porcentajeUpload: Observable<number>;

  public imgName: string;
  public urlImagen: Observable<string>=undefined;
  public imagenUrl : any;
  public foto:undefined

  constructor(private auth: AuthProvider,
    private usuarioService: UsuarioService,  
     private storage: AngularFireStorage,
     private router: Router) {

    this.imgName = "Seleccionar imágen..";
    this.usuario = this.auth.usuarioVacio();
    this.cargoImagen=false;
    // this.captchaVerificado = false;
  }

  ngOnInit() { }

  registrarse() {
    console.log("registro")
    this.imagenUrl = this.InputImagenUser.nativeElement.value;
    if (!this.imagenUrl ) {
      this.imagenUrl = "assets/imagenes/default-user.png";
    }

    this.usuario.logeado = false; 
    this.usuario.apellido = this.apellidoModel; 
    this.usuario.activo = false; 
    this.usuario.perfil = Perfil.cliente; 
    this.usuario.correo = this.emailModel;
    this.usuario.nombre = this.nombreModel;
    this.usuario.clave = this.passwordModel;
    this.usuario.foto = this.InputImagenUser.nativeElement.value;
    console.log("this.usuario ",this.usuario)
    this.usuarioService.RegistrarUsuario(this.usuario);   
    this.router.navigate(['/login']);
  }
 

   ImagenCargada(e) {
    this.cargoImagen=true;
    this.noCargando = false;
    const img = e.target.files[0];
    console.log("img: ", img)

    if (img != undefined) {
      this.imgName = img.name;
      console.log("imgName: ", this.imgName)
      const nombreImg = img.name.substr(0, img.name.lastIndexOf('.'));
      const ext = img.name.substr(img.name.lastIndexOf('.') + 1);
      const filePath = "imagenes/usuarios/" + nombreImg + "-" + Date.now() + "." + ext;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, img);

      this.porcentajeUpload = task.percentageChanges();   

      task.snapshotChanges().pipe(finalize(() => this.urlImagen = ref.getDownloadURL())).subscribe();
    }
    else {
      this.imgName = "Seleccionar imágen..";
      this.urlImagen = undefined;
      this.noCargando = true;
    }
        console.log("urlImagen: ", this.urlImagen);
        this.imgName = "Seleccionar imágen..";
        this.urlImagen = undefined;
        this.noCargando = true;
  }

  

  crearTest() {
    this.nombreModel = "cliente1";
    this.apellidoModel = "cliente";
    this.emailModel = "cliente1@cliente.com";
    this.passwordModel = "123456";
    this.accepted = true;
  }

  
}