import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { EstadoPedido, TipoProducto } from 'src/app/clases/enum';

@Component({
  selector: 'app-pedidos-pendientes-cocinero',
  templateUrl: './pedidos-pendientes-cocinero.component.html',
  styleUrls: ['./pedidos-pendientes-cocinero.component.scss']
})
export class PedidosPendientesCocineroComponent implements OnInit {
  
  public vacia:boolean;
  public pedidos:Array<any> = [];
  public pedidoSeleccionado:any;
  public productos:Array<any> = [];
  public pendiente = EstadoPedido.pendiente;
  public aceptado = EstadoPedido.aceptado;  
  public enPreparacion = EstadoPedido.enPreparacion;
  public plato = TipoProducto.plato;
  public correo:string;
  public info:boolean;

  private columsPedido: string[] = [ 'Codigo' ,'Detalle','Descripcion','Tiempo Promedio Elaboracion'];
  private columsProductoPedido: string[] = [ 'Tipo','Descripcion' ,'Precio','Empleado','Estado Producto','Tiempo Promedio Elaboracion','Tomar Pedido','Foto'];
  private dataSource = new MatTableDataSource(this.pedidos);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
  private dataSourceProd : any;
  private noDataProd: any;

  constructor(private  data:  AuthService,    
    private auth: AuthProvider) { 

      this.correo=localStorage.getItem("usuarioComanda");
      this.info=false;
      this.obtenerPedidos();  
  }

  ngOnInit() {}

  obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
        this.pedidos=lista; 
        this.vacia=this.pedidos.length==0;     
        this.dataSource = new MatTableDataSource(this.pedidos);      
    });    
   }

  aplicarFiltros(filterValue: string) {    
    if (this.info){     
      this.dataSourceProd.filter = filterValue.trim().toLowerCase();      
    }   
  }


  tomarPedido(producto){  
    for (let i=0; i<=this.pedidoSeleccionado.productos.length-1;i++){
      if(this.pedidoSeleccionado.productos[i].numeroProducto==producto.numeroProducto){
         producto.estadoProdPedido=this.enPreparacion;
         producto.empleado=this.correo;
         this.pedidoSeleccionado.productos[i]=producto;
      }
    }      
    this.auth.actualizarPedido(this.pedidoSeleccionado).then(res => {
      console.log("pedido en preparacion")
    });
 }
 showInfo(item){
  this.pedidoSeleccionado=item;

  if (!this.info){ 
    this.info=true;
    this.productos=item.productos;       
    this.dataSourceProd = new MatTableDataSource(this.productos);      
    this.aplicarFiltros("");
    this.dataSourceProd.filterPredicate = function (data, filter: string): boolean {
        return data.tipo.toLowerCase().includes(filter);
    };       
  }else{
    this.pedidoSeleccionado = '';     
    this.info=false;
    this.productos = [];     
  }
}

}
