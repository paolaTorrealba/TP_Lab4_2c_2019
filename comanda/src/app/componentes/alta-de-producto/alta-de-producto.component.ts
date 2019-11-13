import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthProvider } from 'src/app/providers/auth';

@Component({
  selector: 'app-alta-de-producto',
  templateUrl: './alta-de-producto.component.html',
  styleUrls: ['./alta-de-producto.component.scss']
})
export class AltaDeProductoComponent implements OnInit {

  @ViewChild("imgProducto", { static: false })
   InputImagenProd: ElementRef;

  //Datos del producto
  nombreModel: string;
  tipoModel: string
  descripcionModel: string
  tiempopromElaboracionModel: string
  precioModel: number
  estado: boolean;
  numeroProducto:number;

  public urlImagen: Observable<string>;
  porcentajeUpload: Observable<number>; 
  imgName: string;
  noCargando = true;
  imagenUrl : any;
  foto:string;

  constructor(private auth: AuthProvider,
    private storage: AngularFireStorage, 
    private elRef: ElementRef) {
   this.imgName = "Seleccionar imágen..";
 }

  ngOnInit() {}

  agregarProducto() {
    console.log("agregar Producto") 
    this.imagenUrl = this.InputImagenProd.nativeElement.value;
    if (!this.imagenUrl ) {
      this.imagenUrl = "assets/imagenes/default-prod.png";
    }

      let data = {
        nombre:this.nombreModel,
        tipo:this.tipoModel,
        descripcion:this.descripcionModel, 
        tiempoPromedioElaboracion:this.tiempopromElaboracionModel, 
        precio: this.precioModel,
        numeroProducto:1,       
        foto:this.imagenUrl,
   
  }

  console.log("guardo el producto")
    this.auth.guardarProducto(data);
  }

  ImagenCargada(e) {
    console.log("cargar imagen")
    this.noCargando = false;
    const img = e.target.files[0];

    if (img != undefined) {
      this.imgName = img.name;
      const nombreImg = img.name.substr(0, img.name.lastIndexOf('.'));
      const ext = img.name.substr(img.name.lastIndexOf('.') + 1);
      const filePath = "imagenes/productos/" + nombreImg + "-" + Date.now() + "." + ext;
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
