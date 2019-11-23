import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { EstadoPedido } from 'src/app/clases/enum';

@Component({
  selector: 'app-finalizar-pedido-cervecero',
  templateUrl: './finalizar-pedido-cervecero.component.html',
  styleUrls: ['./finalizar-pedido-cervecero.component.scss']
})
export class FinalizarPedidoCerveceroComponent implements OnInit {
  public pedidos:Array<any> = [];
  public pendiente:string="pendiente";
  public aceptado:string="aceptado";  
  public enPreparacion:string="en preparacion";
  public cerrado:string="cerrado";
  public cerveza:string="cerveza";
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
           producto.estadoProdPedido=this.cerrado;
           item.productos[i]=producto;
          }
      }
      this.actualizarPedido(item);
      console.log("pedido a actualizar", item)
      this.auth.actualizarPedido(item).then(res => {
        console.log("pedido cerrado")
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
       this.pedidoListo=false; //no esta listo aun
       }
   }
   if (this.pedidoListo){
    item.estado=EstadoPedido.listoParaServir;
    this.auth.actualizarPedido(item).then(res => {
      console.log("pedido listo para servir")
    });
   }
          
  }
}
