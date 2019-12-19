import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { EstadoPedido, Perfil } from 'src/app/clases/enum';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DataApiService } from 'src/app/servicios/data-api.service';
import { take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.component.html',
  styleUrls: ['./confirmar-pedido.component.scss']
})
export class ConfirmarPedidoComponent implements OnInit {

  public info:boolean;
  public pedidos:Array<any> = [];
  public pedidosListos :Array<any> = [];
  public productos:Array<any> = [];
  public vacia:boolean;
  public cerrado=EstadoPedido.cerrado;
  public entregado=EstadoPedido.entregado;
  public listoParaServir= EstadoPedido.listoParaServir;

  public correo:string;
  public perfil: Perfil;
  public nombre: string;

  private columsPedidos: string[] = ['Mesa', 'Importe','Estado', 'Detalle','Entregar'];
  private dataSource = new MatTableDataSource(this.pedidosListos);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
  
  private columsProductoPedido: string[] = ['Descripcion','Empleado','Estado Producto','Foto'];
  private dataSourceProd : any;
  private noDataProd: any;
  constructor(private  data:  AuthService,
       private auth: AuthProvider,
       private usuarioService: UsuarioService,
       private dataApi: DataApiService) {     
      
         this.obtenerUsuario();     
     }
  ngOnInit() {}

  obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
        this.pedidos=lista;
          for (let i=0; i<=this.pedidos.length-1;i++){
            if(this.pedidos[i].estado==EstadoPedido.listoParaServir){  
              console.log(this.pedidos[i].estado, "estado")
              this.pedidosListos.push(this.pedidos[i]);
              this.vacia=this.pedidosListos.length==0;
            }
          }          
          if ( this.pedidosListos==undefined || this.pedidosListos.length==0 )
          {
            this.vacia=true;
          }         
          
        this.dataSource = new MatTableDataSource(this.pedidosListos); 
        console.log("listos, ",this.pedidosListos)     
    });    
   }

   entregarPedido(item){ 

      item.estado=EstadoPedido.entregado;    
      this.auth.actualizarPedido(item).then(res => {
        console.log("pedido entregado a cliente")
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
