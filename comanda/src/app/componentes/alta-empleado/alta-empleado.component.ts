import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthProvider } from 'src/app/providers/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import {Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.scss']
})
export class AltaEmpleadoComponent implements OnInit {

  @ViewChild("imgUsuario", { static: false }) InputImagenUser: ElementRef;

  public nombreModel: string;
  public apellidoModel: string
  public dniModel: string;
  public claveModel:string="";
  public perfilModel:any="bartender";
  public usuario: any;
  public emailModel: string="";
  public passwordModel: string;
  public captchaVerificado: boolean;
  public accepted: boolean;
  public porcentajeUpload: Observable<number>;
  public noCargando = true;

  public imgName: string;
  public urlImagen: Observable<string>=undefined;
  public imagenUrl : any;
  public foto:undefined

  constructor(private auth: AuthProvider,
    private router: Router,
    private usuarioService: UsuarioService,  
    private storage: AngularFireStorage) {

    this.imgName = "Seleccionar imágen..";
    this.usuario = this.auth.usuarioVacio();
    }

  ngOnInit() { }

  confirmar() {
    console.log("registro")   
    this.imagenUrl = this.InputImagenUser.nativeElement.value;
    if (!this.imagenUrl ) {
      this.imagenUrl = "assets/imagenes/default-user.png";
    }
    // let data = {
    //     'nombre':this.nombreModel,
    //     'apellido': this.apellidoModel,
    //     'foto':  this.InputImagenUser.nativeElement.value, 
    //     'perfil':this.perfilModel,
    //     'activo': false,
    //     'logueado': false,
    //     'correo': this.emailModel,
    //     'clave':this.claveModel
    // }

    // console.log(data)
    // this.auth.guardarUsuario(data);
    // this.auth.crearUsuario(this.emailModel,this.claveModel);

    this.usuario.logeado = false; 
    this.usuario.apellido = this.apellidoModel; 
    this.usuario.activo = false; 
    this.usuario.perfil = this.perfilModel; 
    this.usuario.correo = this.emailModel;
    this.usuario.nombre = this.nombreModel;
    this.usuario.clave = this.claveModel;
    this.usuario.foto = this.InputImagenUser.nativeElement.value;
    console.log("this.usuario ",this.usuario)
    this.usuarioService.RegistrarUsuario(this.usuario);   
    this.router.navigate(['/principal']);
  }

  changePerfil(perfil: any) {
      this.perfilModel = perfil;
      console.log("this.perfilModel", this.perfilModel)
  }

  ImagenCargada(e) {
    this.noCargando = false;
    const img = e.target.files[0];
    console.log("img: ", img)

    if (img != undefined) {
      this.imgName = img.name;
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

}

