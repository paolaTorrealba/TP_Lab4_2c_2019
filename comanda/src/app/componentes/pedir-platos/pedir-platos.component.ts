import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { EstadoReserva, Perfil, EstadoPedido } from 'src/app/clases/enum';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DataApiService } from 'src/app/servicios/data-api.service';
import { take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-pedir-platos',
  templateUrl: './pedir-platos.component.html',
  styleUrls: ['./pedir-platos.component.scss']
})
export class PedirPlatosComponent implements OnInit {

  public usuarios;
  public pedidos;
  public usuarioActual;
  public correo;
  public codigoMesa;
  public activa:string="activa";
  public reservas;
  public tiempoTotal:number;
  public nombre:string;
  public apellido:string;
  public tipo:string;
  public pedidoRealizado:boolean= false;
  public montoTotal:number;
  public seleccionados: Array<any> = [];  
  public listarCerveza:boolean=false;
  public listarBarra:boolean=false;
  public listarPlatos: boolean=false;
  public perfil: Perfil;
  foto = ''; 
  logeado:boolean;
  public cantidadPedidos:number=1;
  public tieneReserva:boolean;
  public miReserva:string;

  private columsProducto: string[] = ['Tipo','NombreProducto', 'Foto', 'TiempoPromedio','Precio','Seleccionar', 'Cancelar'];
    
  public productos:Array<any> = []; 
  private dataSource = new MatTableDataSource(this.productos);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
  
  constructor(private  data:  AuthService,
    private auth: AuthProvider,
    private router: Router,
    private usuarioService: UsuarioService,
    private dataApi: DataApiService) { 

    this.montoTotal=0;
    this.tiempoTotal=0;
    this.obtenerUsuario();    
  
    this.obtenerPedidos();   
   
  }

  ngOnInit() {}

//  Si no reservo mesa no puede hacer pedidos
irAReservarMesa(){
    this.router.navigate(['/reservaCliente']);
}
 

obtenerProductos() {
    this.data.getListaProductos("productos").subscribe(lista => {
      this.productos=lista;        
      this.dataSource = new MatTableDataSource(this.productos);      
  });    
 }


agregarPedido(item){
     item.estadoProdPedido=EstadoPedido.pendiente;
     item.empleado="";
     this.seleccionados.push(item);       
     this.montoTotal= this.montoTotal+item.precio;   
     this.tiempoTotal = this.tiempoTotal+item.tiempoPromedioElaboracion;
   }

quitarPedido(item){       
    if (this.montoTotal-item.precio>=0) {
      this.montoTotal= this.montoTotal-item.precio;
    }
    else{
      this.montoTotal=0;
    }
     var indice = this.seleccionados.indexOf(item); 
     this.seleccionados.splice(indice, 1);  
     if(this.tiempoTotal-item.tiempoPromedioElaboracion >=0){
      this.tiempoTotal = this.tiempoTotal-item.tiempoPromedioElaboracion;   
     }else {
      this.tiempoTotal =0;   
     }    
  } 

  aplicarFiltros(filterValue: string) { 
      this.dataSource.filter = filterValue.trim().toLowerCase(); 
  }

  obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista;       
    });
    console.log("pedidos: ",this.pedidos)
    if (this.pedidos!=undefined){
      this.cantidadPedidos= this.pedidos.length+1;
    }
    
   }

guardarPedido(){    
    let data = { 
          fotoMesa:"",
          codigoPedido:"", 
          nombreCliente: this.nombre,     
          estado: EstadoPedido.pendiente,
          fecha: new Date(),
          numero: this.cantidadPedidos,
          productos: this.seleccionados,
          montoTotal: this.montoTotal,
          tiempoElaboracion: this.tiempoTotal,      
          codigoMesa:this.miReserva
    }

    console.log("pedido a guardar: ", data)
    this.auth.guardarPedido(data).then(res =>{
        this.pedidoRealizado= true;
        this.seleccionados= [];
        // this.montoTotal=0;
        // this.tiempoTotal=0;
    }).catch(error => {
        console.log(error,"error al guardar el pedido"); 
  });
    
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
                this.perfil = userx.perfil;    
                this.obtenerReservas();
                this.obtenerProductos();
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
// =======RESERVAS ==========
  obtenerReservas() {  
    this.tieneReserva=false;
    this.data.getListaReservas("reservas").subscribe(lista => {
        this.reservas=lista;         
        for(let i=0; i<=this.reservas.length-1; i++){
          if(this.reservas[i].correo==this.correo &&
            this.reservas[i].estado=="activa"){
            this.miReserva=this.reservas[i].codigoMesa; 
            this.tieneReserva=true;              
          }
        }       
    });
    console.log("reservas: ",this.reservas); 
 } 


 mostrarCerveza(){
  this.tipo="cerveza";
  console.log("mostrar bebidas", this.listarCerveza)
}

mostrarBarra(){
 this.tipo="barra";
 console.log("mostrar barra", this.listarBarra)
}

mostrarPlatos(){
 this.tipo="plato";
 console.log("mostrar plato", this.listarPlatos)
}

}
