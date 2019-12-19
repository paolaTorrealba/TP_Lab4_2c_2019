import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { EstadoPedido, Perfil, EstadoMesa, EstadoReserva } from 'src/app/clases/enum';
import { Observable, empty } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DataApiService } from 'src/app/servicios/data-api.service';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-ver-estado-pedido',
  templateUrl: './ver-estado-pedido.component.html',
  styleUrls: ['./ver-estado-pedido.component.scss']
})
export class VerEstadoPedidoComponent implements OnInit {
 
  public recibido:string="recibido";
  public entregado:EstadoPedido.entregado;  
  public correo:string;
  public nombre:string;
  public perfil:Perfil;
  public miMesa:any;
  public vacia:boolean;
  public info:boolean;
  public miReserva:any;
  public tieneReserva:boolean;
  public reservas:Array<any> = [];

  private columsPedido: string[] = ['Nombre Cliente', 'Codigo Mesa','Codigo Pedido', 'Estado','Detalle','Monto Total','Confirmar Recepcion', 'Cancelar'];
  private columsProductoPedido: string[] = ['Descripcion','Precio','Estado Producto','Tiempo Promedio Elaboracion'];

  public pedidos:Array<any> = [];
  public mesas:Array<any> = [];
  public misPedidos:Array<any> = [];
  public productos:Array<any> = [];

  private dataSourceProd : any;
  private noDataProd: any;
  private dataSource = new MatTableDataSource(this.misPedidos);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
  constructor(private  data:  AuthService,    
    private auth: AuthProvider,
    private router: Router,
    private usuarioService: UsuarioService,
    private dataApi: DataApiService) {    
      this.obtenerUsuario();
    }

  ngOnInit() {}


  obtenerUsuario() { 
    this.usuarioService.EstaLogeado().subscribe(user => {
      if (user) {       
        this.dataApi.TraerUno(user.uid, 'usuarios')
        .pipe(take(1)).subscribe(userx => {
          if (userx) {
            if (userx.activo) {             
                this.usuarioService.usuario = userx;             
                this.correo= userx.correo;
                this.nombre = userx.nombre;            
                this.perfil = userx.perfil;    
                this.obtenerPedidos(); 
            }
            else {             
              this.nombre = "";
              this.correo= ""; 
              this.perfil = null;
            }
          }
        });
      }
      else {
        this.nombre = "";
        this.correo= "";       
        this.perfil = null;
      }
    });
  }

// CANCELAR PEDIDOS--------------
  cancelarPedido(item){   
    item.estado=EstadoPedido.cancelado;
    this.auth.actualizarPedido(item).then(res => {      
    }); 
    
    this.cancelarReservas(item); 
    
  
    this.obtenerPedidos(); 
 }

 cerrarMesa(pedido){    
 console.log("cierro la mesa para: ",pedido)
 this.data.getListaMesas("mesas").subscribe(lista => {
       this.mesas=lista;       
       for(let i=0; i<=this.mesas.length-1; i++){
         if(this.mesas[i].estado==EstadoMesa.reservada &&
           this.mesas[i].codigo==pedido.codigoMesa ){
           this.miMesa=this.mesas[i];            
           if (this.miMesa !=undefined ){
            this.miMesa.estado=EstadoMesa.cerrada;
            console.log("cierro la mesa",this.miMesa )              
            this.auth.actualizarMesa(this.miMesa).then(res => {
            }).catch(error => {          
            });   
    
        }                     
         }
       }    
       
 }) 
    
      console.log("mesa cerrada") 
}
 
cancelarReservas(pedido) { 
 console.log("cancelo la reserva para el pedido",pedido )
 this.tieneReserva=false; 
 this.data.getListaReservas("reservas").subscribe(lista => {
     this.reservas=lista;         
     for(let i=0; i<=this.reservas.length-1; i++){
       if(this.reservas[i].correo==this.correo &&
         this.reservas[i].estado==EstadoReserva.activa &&
         this.reservas[i].codigoMesa==pedido.codigoMesa ){

         this.miReserva=this.reservas[i]; 
         this.tieneReserva=true;              
       }
     }         
    //  obtuve la reserva
     if (this.tieneReserva ){
         this.miReserva.estado=EstadoReserva.finalizada; 
         console.log("actualizo la reserva", this.miReserva)      
         this.auth.actualizarReserva(this.miReserva).then(res =>{
         }).catch(error => {
          
         });          
     }              
 });
 this.cerrarMesa(pedido);
 console.log("reservas: ",this.reservas); 
} 

// CANCELAR PEDIDO ---- FIN
  obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista;     
      for (let i=0; i<=this.pedidos.length-1; i++){
        if(this.pedidos[i].correoCliente==this.correo
          && this.pedidos[i].estado!=EstadoPedido.cancelado){
    
          this.misPedidos.push( this.pedidos[i])
          this.vacia=this.misPedidos.length==0;     
        }
      }   
    });
    if ( this.misPedidos==undefined || this.misPedidos.length==0 )
    {
      this.vacia=true;
    } 
    this.dataSource = new MatTableDataSource(this.misPedidos);      
  }

   
   confirmarRecepcion(item){    
    console.log("item: ", item)    
   
    item.estado=EstadoPedido.recibido;
    console.log("item: ", item) 
    this.auth.actualizarPedido(item).then(res => {
      console.log("pedido recibido por el cliente")
    });
 }

 showInfo(item){
  if (!this.info){
     console.log("item", item)
     this.info=true;
     this.productos=item.productos;
     console.log("productos", this.productos)      
  }else{
     this.info=false;
     this.productos = [];     
  }
  this.dataSourceProd = new MatTableDataSource(this.productos);
   this.noDataProd = this.dataSourceProd.connect().pipe(map((data: any[]) => data.length === 0));
 
}

irAHacerPedido(){
   this.router.navigate(['/pedirPlatos']);

}
}
