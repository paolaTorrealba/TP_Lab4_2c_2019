import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { EstadoPedido } from 'src/app/clases/enum';


@Component({
  selector: 'app-ver-estado-pedido',
  templateUrl: './ver-estado-pedido.component.html',
  styleUrls: ['./ver-estado-pedido.component.scss']
})
export class VerEstadoPedidoComponent implements OnInit {
  public pedidos:Array<any> = [];
  public recibido:string="recibido";
  public entregado:EstadoPedido.entregado;  
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

   
   confirmarRecepcion(item){    
    console.log("item: ", item)    
   
    item.EstadoPedido.recibido;
    console.log("item: ", item) 
    this.auth.actualizarPedido(item).then(res => {
      console.log("pedido recibido por el cliente")
    });
 }
}
