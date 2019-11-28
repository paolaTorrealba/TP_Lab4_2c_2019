import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { EstadoPedido } from 'src/app/clases/enum';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-confirmar-pago',
  templateUrl: './confirmar-pago.component.html',
  styleUrls: ['./confirmar-pago.component.scss']
})
export class ConfirmarPagoComponent implements OnInit {

  public info:boolean;
  public pedidos:Array<any> = [];
  public productos:Array<any> = [];
  
  public cerrado=EstadoPedido.cerrado;
  public entregado=EstadoPedido.entregado;
  public listoParaServir= EstadoPedido.listoParaServir;

  private columsPedidos: string[] = ['Mesa', 'Importe','Estado', 'Detalle','Confirmar Pago'];
  private dataSource = new MatTableDataSource(this.pedidos);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
  
  private columsProductoPedido: string[] = ['Descripcion','Empleado','Estado Producto','Foto'];
  private dataSourceProd : any;
  private noDataProd: any;
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

   confirmarPago(item){ 

      item.estado=EstadoPedido.cerrado;    
      this.auth.actualizarPedido(item).then(res => {
        console.log("pedido cerrado")
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
     this.noDataProd = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
   
  }
}
