import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { EstadoPedido, TipoProducto } from 'src/app/clases/enum';


@Component({
  selector: 'app-pedidos-pendientes-bartender',
  templateUrl: './pedidos-pendientes-bartender.component.html',
  styleUrls: ['./pedidos-pendientes-bartender.component.scss']
})
export class PedidosPendientesBartenderComponent implements OnInit {
  public pedidos:Array<any> = [];
  public pedidoSeleccionado:any;
  public usuarios:Array<any> = [];  
  public productos:Array<any> = [];
  public pendiente:string="pendiente";
  public aceptado:string="aceptado";  
  public enPreparacion:string="en preparacion";
  public barra:string="barra";
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
      this.obtenerPedidos();
      this.info=false;
    }

  ngOnInit() {}

  obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista; 
      console.log("pedidos: ",this.pedidos);
      
      this.dataSource = new MatTableDataSource(this.pedidos);
      
    });
    console.log("pedidos: ",this.pedidos)
   }

 obtenerUsuarios(){
    this.data.getListaUsuarios("usuarios").subscribe(lista => {
      this.usuarios = lista;          
    });
   }

  aplicarFiltros(filterValue: string) {    
    if (this.info){
      console.log("aplico filtros porque es TRUE: ", filterValue)
      this.dataSourceProd.filter = filterValue.trim().toLowerCase();
      console.log("this.productos:",    this.productos)
    }   
  }

   tomarPedido(producto){    

      console.log("this.pedidoSeleccionado: ", this.pedidoSeleccionado)
      console.log("producto: ", producto)
      for (let i=0; i<=this.pedidoSeleccionado.productos.length-1;i++){
        console.log("producto [i]: ", this.pedidoSeleccionado.productos[i])
        if(this.pedidoSeleccionado.productos[i].numeroProducto==producto.numeroProducto){
           producto.estadoProdPedido=this.enPreparacion;
           producto.empleado=this.correo;
           this.pedidoSeleccionado.productos[i]=producto;
        }
      }
      console.log("pedido a modifiar: ",this.pedidoSeleccionado);
      this.auth.actualizarPedido(this.pedidoSeleccionado).then(res => {
        console.log("pedido en preparacion")
      });
   }

   showInfo(item){
    this.pedidoSeleccionado=item;

    if (!this.info){        
       console.log("muestro los detalles. Pedido selec:",this.pedidoSeleccionado);
       console.log("item: ", item)

       this.info=true;
       this.productos=item.productos;
       console.log("Termine de cargado los productos ------") 
       this.dataSourceProd = new MatTableDataSource(this.productos); 

       console.log("llamo a aplicar fitlro ------")    
       this.aplicarFiltros("");
       console.log("llamo a aplicar filtro FIN ------") 

       this.dataSourceProd.filterPredicate = function (data, filter: string): boolean {
          console.log("data y filtro ", data,filter)
          return data.tipo.toLowerCase().includes(filter);
       }; 
       console.log("dataSourceProd", this.dataSourceProd)      
    }else{
      this.pedidoSeleccionado = '';
      console.log("oculto los detalles. Pedido selec:",this.pedidoSeleccionado )
       this.info=false;
       this.productos = [];     
    }
    // this.dataSourceProd = new MatTableDataSource(this.productos);
    // this.noDataProd = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
   
  }
}
