import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { EstadoPedido } from 'src/app/clases/enum';

@Component({
  selector: 'app-finalizar-pedido-bartender',
  templateUrl: './finalizar-pedido-bartender.component.html',
  styleUrls: ['./finalizar-pedido-bartender.component.scss']
})
export class FinalizarPedidoBartenderComponent implements OnInit {
  public pedidos:Array<any> = [];
  public pendiente:string=EstadoPedido.pendiente;
  public aceptado:string=EstadoPedido.aceptado;  
  public enPreparacion= EstadoPedido.enPreparacion;
  public cerrado:string="cerrado";
  public barra:string="barra";
  public pedidoListo:boolean=false;
  public correo:string;
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
      console.log("pedidos: ",this.pedidos); 
    });
    console.log("pedidos: ",this.pedidos)
   }


   cerrarPedido(item, producto){    
      console.log("item: ", item)
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
    console.log("item EN LISTO", item) 
   //  recorro la lista de productos
   for (let i=0; i<=item.productos.length-1;i++){
     if(item.productos[i].estadoProdPedido==this.enPreparacion ||
       item.productos[i].estadoProdPedido==this.pendiente )  {       
        console.log("--TODAVIA NOS E PUEDE CERRAR")  
        this.pedidoListo=false; //no esta listo aun
       }
   }
   if (this.pedidoListo){
    item.estado=EstadoPedido.listoParaServir;
    // this.auth.actualizarPedido(item).then(res => {
    //   console.log("pedido listo para servir")
    // });
   }
          
  }
}
