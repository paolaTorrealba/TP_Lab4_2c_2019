import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, empty } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pedidos-pendientes',
  templateUrl: './pedidos-pendientes.component.html',
  styleUrls: ['./pedidos-pendientes.component.scss']
})
export class PedidosPendientesComponent implements OnInit {
  @ViewChild("imgPedido", { static: false }) InputImagenPedido: ElementRef;
  public pedidos:Array<any> = [];
  public estado:string="pendiente";
  imgName: string;
  porcentajeUpload: Observable<number>;
  public urlImagen: Observable<string>; 
  imagenUrl : any;
  noCargando = true;
  public codigo = '';

  constructor(private  data:  AuthService,
    private storage: AngularFireStorage, 
    private auth: AuthProvider) { 

      this.imgName = "Seleccionar imágen..";
      this.obtenerPedidos();
    }

  ngOnInit() {
  }

  obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista; 
      console.log("pedidos: ",this.pedidos); 
    });
    console.log("pedidos: ",this.pedidos)
   }

   aceptarPedido(item){
    this.imagenUrl = this.InputImagenPedido.nativeElement.value;
    if (!this.imagenUrl ) {
      this.imagenUrl = "assets/imagenes/default-mesa.png";
    }


      console.log("item: ", item)
      console.log("la imagen: ", this.imagenUrl)
      item.foto=this.imagenUrl;
      item.codigo=this.codigo;
      item.estado="aceptado";    
      this.auth.actualizarPedido(item).then(res => {
        console.log("pedido aceptado")
      });
   }

   ImagenCargada(e) {
    console.log("cargar imagen")
    this.noCargando = false;
    const img = e.target.files[0];

    if (img != undefined) {
      this.imgName = img.name;
      const nombreImg = img.name.substr(0, img.name.lastIndexOf('.'));
      const ext = img.name.substr(img.name.lastIndexOf('.') + 1);
      const filePath = "imagenes/pedido/" + nombreImg + "-" + Date.now() + "." + ext;
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
   generarCodigo(){
     this.codigo= '';
     console.log("genero el codigo")   
     let rString = this.randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
     console.log(rString);       
   }

   randomString(length, chars) {    
    for (var i = length; i > 0; --i) 
    this.codigo += chars[Math.floor(Math.random() * chars.length)];
 
   }

   agregarFoto(){

   }
}
