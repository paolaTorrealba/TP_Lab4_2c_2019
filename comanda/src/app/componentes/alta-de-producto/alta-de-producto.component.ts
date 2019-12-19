import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthProvider } from 'src/app/providers/auth';
import { TipoProducto } from 'src/app/clases/enum';
import { AuthService } from 'src/app/servicios/auth.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-alta-de-producto',
  templateUrl: './alta-de-producto.component.html',
  styleUrls: ['./alta-de-producto.component.scss']
})
export class AltaDeProductoComponent implements OnInit {

  @ViewChild("imgProducto", { static: false })
   InputImagenProd: ElementRef;

  public nombreModel: string;
  public tipoModel= TipoProducto.plato;
  public descripcionModel: string
  public tiempoPromElaboracionModel: string
  public precioModel: number
  public estado: boolean;
  public numeroProducto:number;
  public porcentajeUpload: Observable<number>;
  public noCargando = true;
  public cargoImagen: boolean;
  public productos:Array<any> = [];

  public imgName: string;
  public urlImagen: Observable<string>=undefined;
  public imagenUrl : any;
  public foto:undefined

  constructor(private  data:  AuthService,
    private auth:  AuthProvider,
    private router: Router,
    private storage: AngularFireStorage) {

        this.imgName = "Seleccionar imágen..";
        this.obtenerProductos();
        this.cargoImagen=false;
 }

 obtenerProductos(){  
 this.data.getListaProductos("productos").subscribe(lista => {
   this.productos=lista;      
 });
 console.log("productos: ",this.productos)
}

  ngOnInit() {}

  confirmar() {
      console.log("agregar Producto") 
      this.imagenUrl = this.InputImagenProd.nativeElement.value;
      if (!this.imagenUrl ) {
        this.imagenUrl = "assets/imagenes/default-producto.jpg";
      }
      let data = {
            nombre:this.nombreModel,
            tipo:this.tipoModel,
            descripcion:this.descripcionModel, 
            tiempoPromedioElaboracion: Number(this.tiempoPromElaboracionModel), 
            precio: Number(this.precioModel),
            numeroProducto:this.productos.length+1,       
            foto:this.InputImagenProd.nativeElement.value 
      }
      console.log("guardo el producto", data)
      this.auth.guardarProducto(data);
      this.router.navigate(['/principal']);
    }

  ImagenCargada(e) { 
    this.cargoImagen=true;   
    this.noCargando = false;
    const img = e.target.files[0];
    console.log("cargar imagen")

    if (img != undefined) {
      this.imgName = img.name;
      console.log("imgName: ", this.imgName)
      const nombreImg = img.name.substr(0, img.name.lastIndexOf('.'));
      const ext = img.name.substr(img.name.lastIndexOf('.') + 1);
      const filePath = "imagenes/productos/" + nombreImg + "-" + Date.now() + "." + ext;
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

  changeTipo(tipo: any) {
    this.tipoModel = tipo;
    console.log("this.tipoModel", this.tipoModel)
}

}
