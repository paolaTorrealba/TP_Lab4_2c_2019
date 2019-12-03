import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { EstadoPedido } from 'src/app/clases/enum';

@Component({
  selector: 'app-finalizar-pedido-cocinero',
  templateUrl: './finalizar-pedido-cocinero.component.html',
  styleUrls: ['./finalizar-pedido-cocinero.component.scss']
})
export class FinalizarPedidoCocineroComponent implements OnInit {
  public pedidos:Array<any> = [];
  public pendiente:string="pendiente";
  public aceptado:string="aceptado";  
  public enPreparacion= EstadoPedido.enPreparacion;
  public cerrado:string="cerrado";
  public plato:string="plato";
  public pedidoListo:boolean=false;
  public correo:string;
  public vacia:boolean;
  public listoParaServir:string="listoParaServir";

  constructor(private  data:  AuthService,  
    private auth: AuthProvider) {
      this.correo=localStorage.getItem("usuarioComanda") 
      this.obtenerPedidos();
    }

  ngOnInit() {}

  obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista; 
      this.vacia=this.pedidos.length==0; 
    });
    console.log("pedidos: ",this.pedidos)
   }


   cerrarPedido(item, producto){   
     console.log("cerrando pedido") 
      console.log("item EN CERRADO: ", item)
      console.log("producto: ", producto)
      for (let i=0; i<=item.productos.length-1;i++){
        if(item.productos[i].numeroProducto==producto.numeroProducto){
           producto.estadoProdPedido=EstadoPedido.cerrado;
           item.productos[i]=producto;
        }
      }
      console.log("ANTES DE ACTUALIZACION FINAL", item)
      this.actualizarPedido(item);
      console.log("ACTUALIZACION FINAL", item)
      this.auth.actualizarPedido(item).then(res => {
        console.log("pedido listo para servir")
      });
   }

   actualizarPedido(item){
    console.log("cambio estado a listo") 
    this.pedidoListo=true;
    console.log("item EN LISTO", this.pedidoListo) 
   //  recorro la lista de productos
   for (let i=0; i<=item.productos.length-1;i++){
     if(item.productos[i].estadoProdPedido==EstadoPedido.enPreparacion ||
       item.productos[i].estadoProdPedido==EstadoPedido.pendiente )  {
         console.log("--TODAVIA NOS E PUEDE CERRAR")       
       this.pedidoListo=false; //no esta listo aun
       }
   }
   if (this.pedidoListo){
    console.log("el pedido esta listo: ",this.pedidoListo)
    item.estado=EstadoPedido.listoParaServir;
    console.log("item.estado: ",item.estado)
    console.log("item a guardar: ",item)
    // this.auth.actualizarPedido(item).then(res => {
    //   console.log("pedido listo para servir")
    // });
   }
   console.log("el pedido aun no esta listo :(")
          
  }



}
