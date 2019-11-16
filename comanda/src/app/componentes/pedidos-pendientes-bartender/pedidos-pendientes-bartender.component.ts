import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-pedidos-pendientes-bartender',
  templateUrl: './pedidos-pendientes-bartender.component.html',
  styleUrls: ['./pedidos-pendientes-bartender.component.scss']
})
export class PedidosPendientesBartenderComponent implements OnInit {
  public pedidos:Array<any> = [];
  public pendiente:string="pendiente";
  public aceptado:string="aceptado";  
  public enPreparacion:string="en preparacion";
  public barra:string="barra";
  public correo:string;
  

  constructor(private  data:  AuthService,    
    private auth: AuthProvider) { 
      this.correo=localStorage.getItem("usuarioComanda");
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


   tomarPedido(item, producto){    
      console.log("item: ", item)
      console.log("producto: ", producto)
      for (let i=0; i<=item.productos.length-1;i++){
        if(item.productos[i].numeroProducto==producto.numeroProducto)
           producto.estadoProdPedido=this.enPreparacion;
           producto.empleado=this.correo;
           item.productos[i]=producto;
      }

      this.auth.actualizarPedido(item).then(res => {
        console.log("pedido en preparacion")
      });
   }

}
