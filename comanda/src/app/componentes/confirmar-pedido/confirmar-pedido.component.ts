import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';


@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.component.html',
  styleUrls: ['./confirmar-pedido.component.scss']
})
export class ConfirmarPedidoComponent implements OnInit {

  public pedidos:Array<any> = [];
  public cerrado:string="cerrado";
  public entregado:string="entregado";
  public listoParaServir:string="listoParaServir";

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

   entregarPedido(item){   
      console.log("item: ", item)    

      item.estado=this.entregado;    
      this.auth.actualizarPedido(item).then(res => {
        console.log("pedido entregado a cliente")
      });
   }

}
