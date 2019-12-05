import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { EstadoPedido, Perfil } from 'src/app/clases/enum';
import { Observable, empty } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DataApiService } from 'src/app/servicios/data-api.service';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-ver-estado-pedido',
  templateUrl: './ver-estado-pedido.component.html',
  styleUrls: ['./ver-estado-pedido.component.scss']
})
export class VerEstadoPedidoComponent implements OnInit {
 
  public recibido:string="recibido";
  public entregado:EstadoPedido.entregado;  
  public correo:string;
  public nombre:string;
  public perfil:Perfil;
  public vacia:boolean;
  public info:boolean;

  private columsPedido: string[] = ['Nombre Cliente', 'Codigo Mesa', 'Estado','Detalle','Codigo Pedido','Monto Total','Confirmar Recepcion'];
  private columsProductoPedido: string[] = ['Descripcion','Precio','Estado Producto','Tiempo Promedio Elaboracion'];

  public pedidos:Array<any> = [];
  public misPedidos:Array<any> = [];
  public productos:Array<any> = [];

  private dataSourceProd : any;
  private noDataProd: any;
  private dataSource = new MatTableDataSource(this.misPedidos);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
  constructor(private  data:  AuthService,    
    private auth: AuthProvider,
    private router: Router,
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
                this.perfil = userx.perfil;    
                this.obtenerPedidos(); 
            }
            else {             
              this.nombre = "";
              this.correo= ""; 
              this.perfil = null;
            }
          }
        });
      }
      else {
        this.nombre = "";
        this.correo= "";       
        this.perfil = null;
      }
    });
  }
  obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista; 
      console.log("1: ",this.pedidos)
      console.log("2 ",this.pedidos.length)
      for (let i=0; i<=this.pedidos.length-1; i++){
        if(this.pedidos[i].correoCliente==this.correo
          && this.pedidos[i].estado!=EstadoPedido.cancelado){
            
          this.misPedidos.push( this.pedidos[i])
          this.vacia=false;
          this.dataSource = new MatTableDataSource(this.misPedidos); 
               
        }
      }      
    });
   
  }

   
   confirmarRecepcion(item){    
    console.log("item: ", item)    
   
    item.estado=EstadoPedido.recibido;
    console.log("item: ", item) 
    this.auth.actualizarPedido(item).then(res => {
      console.log("pedido recibido por el cliente")
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
   this.noDataProd = this.dataSourceProd.connect().pipe(map((data: any[]) => data.length === 0));
 
}
}
