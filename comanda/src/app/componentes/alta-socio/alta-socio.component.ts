import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthProvider } from 'src/app/providers/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Perfil } from 'src/app/clases/enum';

@Component({
  selector: 'app-alta-socio',
  templateUrl: './alta-socio.component.html',
  styleUrls: ['./alta-socio.component.scss']
})
export class AltaSocioComponent implements OnInit {

  @ViewChild("imgUsuario", { static: false }) InputImagenUser: ElementRef;


  public imgName: string;
  public nombreModel: string;
  public apellidoModel: string
  public dniModel: string;
  public claveModel:string;
  public usuario: any;
  public cargoImagen:boolean;
  public emailModel: string;
  public accepted: boolean;
  public porcentajeUpload: Observable<number>;
  public urlImagen: Observable<string>;
  public noCargando = true;
  public imagenUrl : any;
  public foto:string;


  constructor(private auth: AuthProvider, 
    private storage: AngularFireStorage) {

    this.imgName = "Seleccionar imágen..";
    this.usuario = this.auth.usuarioVacio();
    this.cargoImagen=false; 
  }

  ngOnInit() { }

  confirmar() {   
    this.imagenUrl = this.InputImagenUser.nativeElement.value;
    if (!this.imagenUrl ) {
      this.imagenUrl = "assets/imagenes/default-user.png";
    }
    let data = {
        'nombre':this.nombreModel,
        'apellido': this.apellidoModel,
        'foto': this.imagenUrl,
        'perfil':Perfil.socio,
        'activo': false,
        'logueado': false,
        'correo': this.emailModel,
        'clave':this.claveModel
    }
    console.log(data)
    this.auth.guardarUsuario(data);
  }

  ImagenCargada(e) {
    this.cargoImagen=true; 
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



}
