import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';

@Component({
  selector: 'app-pedidos-pendientes',
  templateUrl: './pedidos-pendientes.component.html',
  styleUrls: ['./pedidos-pendientes.component.scss']
})
export class PedidosPendientesComponent implements OnInit {
  public pedidos:Array<any> = [];
  public estado:string="pendiente";
  constructor(private  data:  AuthService,
    private auth: AuthProvider) { 
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
      console.log("item: ", item)
      item.estado="aceptado";    
      this.auth.actualizarPedido(item).then(res => {
        console.log("pedido aceptado")
      });
   }
}
