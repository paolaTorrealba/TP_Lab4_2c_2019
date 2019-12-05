import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { EstadoPedido, TipoProducto, Perfil } from 'src/app/clases/enum';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DataApiService } from 'src/app/servicios/data-api.service';
import { take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pedidos-pendientes-bartender',
  templateUrl: './pedidos-pendientes-bartender.component.html',
  styleUrls: ['./pedidos-pendientes-bartender.component.scss']
})
export class PedidosPendientesBartenderComponent implements OnInit {

  public vacia:boolean;
  public pedidos:Array<any> = [];
  public pedidoSeleccionado:any;
  public productos:Array<any> = [];
  public pedidosAceptados:Array<any> = [];
  public pendiente = EstadoPedido.pendiente;
  public aceptado = EstadoPedido.aceptado;  
  public enPreparacion = EstadoPedido.enPreparacion;
  public barra = TipoProducto.barra;
  public info:boolean;

  private columsPedido: string[] = [ 'Codigo' ,'Detalle','Descripcion','Tiempo Promedio Elaboracion'];
  private columsProductoPedido: string[] = [ 'Tipo','Descripcion' ,'Precio','Empleado','Estado Producto','Tiempo Promedio Elaboracion','Tomar Pedido','Foto'];
  private dataSource = new MatTableDataSource(this.pedidosAceptados);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
  private dataSourceProd : any;
  private noDataProd: any;

  
  public correo:string;
  public perfil: Perfil;
  public nombre: string;

  constructor(private  data:  AuthService,    
    private auth: AuthProvider,
    private usuarioService: UsuarioService,
    private dataApi: DataApiService) {     
      this.info=false;
      this.obtenerUsuario();     
  }

  ngOnInit() {}

  obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
        this.pedidos=lista;
             
          for (let i=0; i<=this.pedidos.length-1;i++){
            if(this.pedidos[i].estado==EstadoPedido.aceptado){
              this.pedidosAceptados.push(this.pedidos[i]);
            }
          }          
                
        this.vacia=this.pedidosAceptados.length==0;     
        this.dataSource = new MatTableDataSource(this.pedidosAceptados);      
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

  obtenerUsuario() { 
    this.usuarioService.EstaLogeado().subscribe(user => {
      if (user) {       
        this.dataApi.TraerUno(user.uid, 'usuarios')
        .pipe(take(1)).subscribe(userx => {
          if (userx) {
            if (userx.activo) {             
                this.usuarioService.usuario = userx;             
                this.correo= userx.correo;
                this.nombre = userx.nombre; 
                this.obtenerPedidos(); 
            }
            else {             
              this.nombre = "";
              this.correo= "";               
            }
          }
        });
      }
      else {
        this.nombre = "";
        this.correo= "";      
       
      }
    });
  }
}
