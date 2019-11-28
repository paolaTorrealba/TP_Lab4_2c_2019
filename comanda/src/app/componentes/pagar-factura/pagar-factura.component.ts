import { Component, OnInit } from '@angular/core';
import { EstadoPedido } from 'src/app/clases/enum';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';

@Component({
  selector: 'app-pagar-factura',
  templateUrl: './pagar-factura.component.html',
  styleUrls: ['./pagar-factura.component.scss']
})
export class PagarFacturaComponent implements OnInit {

  public pedidos:Array<any> = [];
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

   
   pagar(item){    
    console.log("item: ", item)    
   
    item.estado=EstadoPedido.pagado;
    console.log("item: ", item) 
    this.auth.actualizarPedido(item).then(res => {
      console.log("pedido abonado por el cliente")
    });   
    
   
 }
}

