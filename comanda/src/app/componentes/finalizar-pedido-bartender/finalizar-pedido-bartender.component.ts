import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';

@Component({
  selector: 'app-finalizar-pedido-bartender',
  templateUrl: './finalizar-pedido-bartender.component.html',
  styleUrls: ['./finalizar-pedido-bartender.component.scss']
})
export class FinalizarPedidoBartenderComponent implements OnInit {
  public pedidos:Array<any> = [];
  public pendiente:string="pendiente";
  public aceptado:string="aceptado";  
  public enPreparacion:string="en preparacion";
  public cerrado:string="cerrado";
  public barra:string="barra";

  constructor(private  data:  AuthService,  
    private auth: AuthProvider) { 
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
        if(item.productos[i].numeroProducto==producto.numeroProducto)
           producto.estadoProdPedido=this.cerrado;
           item.productos[i]=producto;
      }

      this.auth.actualizarPedido(item).then(res => {
        console.log("pedido cerrado")
      });
   }

}
