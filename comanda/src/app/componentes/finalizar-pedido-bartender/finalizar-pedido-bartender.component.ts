import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { EstadoPedido, Perfil } from 'src/app/clases/enum';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DataApiService } from 'src/app/servicios/data-api.service';
import { take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-finalizar-pedido-bartender',
  templateUrl: './finalizar-pedido-bartender.component.html',
  styleUrls: ['./finalizar-pedido-bartender.component.scss']
})
export class FinalizarPedidoBartenderComponent implements OnInit {
  public pedidos:Array<any> = [];
  public pedidosEnPreparacion:Array<any> = [];
  public pedidosAceptados:Array<any> = [];
  public vacia: boolean;
  public info:boolean;
  public pedidoSeleccionado:any;
  public pendiente:string=EstadoPedido.pendiente;
  public aceptado:string=EstadoPedido.aceptado;  
  public enPreparacion= EstadoPedido.enPreparacion;
  public cerrado:string="cerrado";
  public productos:Array<any> = [];
  public barra:string="barra";
  public pedidoListo:boolean=false;
  public listoParaServir:string="listoParaServir";
  public tarea:string;
  public correo:string;
  public perfil: Perfil;
  public nombre: string;

  private columsPedido: string[] = [ 'Codigo Pedido' ,  'Estado','Detalle'];
  private columsProductoPedido: string[] = [ 'Tipo','Descripcion' , 'Empleado', 'Estado Producto','Finalizar'];
  private dataSource = new MatTableDataSource(this.pedidosAceptados);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
  private dataSourceProd : any;
  private noDataProd: any;

  constructor(private  data:  AuthService,  
    private auth: AuthProvider,
       private usuarioService: UsuarioService,
       private dataApi: DataApiService) { 
   
      this.obtenerUsuario();
    }

  ngOnInit() {}

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
                this.quePuedeCerrar() 
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
  obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista;
      for (let i=0; i<=this.pedidos.length-1;i++){
        if(this.pedidos[i].estado==EstadoPedido.aceptado){ 
          this.pedidosAceptados.push(this.pedidos[i])
           this.vacia=this.pedidos.length==0;
        }
      }
    });
    console.log("pedidos: ",this.pedidos)
   }
   quePuedeCerrar(){
    if(this.perfil==Perfil.bartender)
       this.tarea="barra";
    if(this.perfil==Perfil.cocinero)
       this.tarea="plato";
    if(this.perfil==Perfil.cervecero)
       this.tarea="cerveza";
       
    console.log(this.tarea)   
 }

 showInfo(item){
   console.log(item)
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

aplicarFiltros(filterValue: string) {    
  if (this.info){     
    this.dataSourceProd.filter = filterValue.trim().toLowerCase();      
  }   
}

   cerrarPedido(producto){    
      console.log("item: ", this.pedidoSeleccionado)
      console.log("producto: ", producto)
      for (let i=0; i<=this.pedidoSeleccionado.productos.length-1;i++){
        if(this.pedidoSeleccionado.productos[i].numeroProducto==producto.numeroProducto){
           producto.estadoProdPedido=EstadoPedido.cerrado;
           this.pedidoSeleccionado.productos[i]=producto;
          }
      }
      console.log("ANTES DE ACTUALIZACION FINAL", this.pedidoSeleccionado)
      this.actualizarPedido(this.pedidoSeleccionado);
      console.log("ACTUALIZACION FINAL", this.pedidoSeleccionado)
      this.auth.actualizarPedido(this.pedidoSeleccionado).then(res => {
        console.log("pedido listo para servir")
      });
   }
   
   actualizarPedido(item){
    console.log("cambio estado a listo") 
    this.pedidoListo=true;
    console.log("item EN LISTO", item) 
   //  recorro la lista de productos
   for (let i=0; i<=item.productos.length-1;i++){
     if(item.productos[i].estadoProdPedido==this.enPreparacion ||
       item.productos[i].estadoProdPedido==this.pendiente )  {       
        console.log("--TODAVIA NOS E PUEDE CERRAR")  
        this.pedidoListo=false; //no esta listo aun
       }
   }
   if (this.pedidoListo){
    item.estado=EstadoPedido.listoParaServir;
    // this.auth.actualizarPedido(item).then(res => {
    //   console.log("pedido listo para servir")
    // });
   }
          
  }
}
