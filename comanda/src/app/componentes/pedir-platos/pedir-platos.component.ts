import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { EstadoReserva, Perfil } from 'src/app/clases/enum';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DataApiService } from 'src/app/servicios/data-api.service';
import { take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pedir-platos',
  templateUrl: './pedir-platos.component.html',
  styleUrls: ['./pedir-platos.component.scss']
})
export class PedirPlatosComponent implements OnInit {
  public productos:Array<any> = [];
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


  private columsProducto: string[] = ['Foto','Tipo','Descripcion','Precio','Tiempo Promedio Elaboracion','Seleccionar', 'Cancelar'];
  private dataSource = new MatTableDataSource(this.productos);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
  
  constructor(private  data:  AuthService,
    private auth: AuthProvider,
    private usuarioService: UsuarioService,
    private dataApi: DataApiService) { 

    this.montoTotal=0;
    this.tiempoTotal=0;
    this.obtenerUsuario();
    this.obtenerProductos();
    this.obtenerReservas();    
    this.obtenerPedidos();
    
    if(this.productos!=undefined){
      console.log("Productos cargado: ",this.productos);  
      this.dataSource = new MatTableDataSource(this.productos);      
      console.log("this.dataSource asignado: ",this.dataSource)
      this.aplicarFiltros("");
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
          return data.tipo.toLowerCase().includes(filter);
     };  
       
    } 

    
    // this.obtenerCliente();
   
  }

  ngOnInit() {}

  obtenerReservas() {
    this.data.getListaReservas("reservas").subscribe(lista => {
        this.reservas=lista;
        console.log("reservas: ",this.reservas); 
        for (let i=0; i<=this.reservas.length-1; i++){
          if (this.reservas[i].estado==EstadoReserva.activa
            && this.reservas[i].correo==this.correo){
              this.codigoMesa=this.reservas[i].codigoMesa;
            }
        } 
    });
    console.log("reservas: ",this.reservas);  
   } 

  obtenerProductos() {
    this.data.getListaProductos("productos").subscribe(lista => {
          this.productos=lista; 

          if(this.productos!=undefined){
              console.log("Productos cargado: ",this.productos);  
              this.dataSource = new MatTableDataSource(this.productos);      
              // console.log("this.dataSource asignado: ",this.dataSource)
              // this.aplicarFiltros("");
              // this.dataSource.filterPredicate = function (data, filter: string): boolean {
              //     return data.tipo.toLowerCase().includes(filter);
              // };  
          }               
      });  
      
      
   } 

   agregarPedido(item){
     item.estadoProdPedido="pendiente";
     item.empleado="";
     this.seleccionados.push(item);   
     console.log(" this.seleccionados: ",  this.seleccionados)
     this.montoTotal= this.montoTotal+item.precio;
     console.log("monto:", this.montoTotal)
     this.tiempoTotal = this.tiempoTotal+item.tiempoPromedioElaboracion;
     console.log("item:", item)
     console.log("item:", item.tiempoPromedioElaboracion)
     console.log("tiempo:", this.tiempoTotal)


   }

   quitarPedido(item){
     console.log("resto el valor de item" )
     this.montoTotal= this.montoTotal-item.precio;
     var indice = this.seleccionados.indexOf(item); 
     this.seleccionados.splice(indice, 1); 
     console.log("this.seleccionados: ",this.seleccionados )
     this.tiempoTotal = this.tiempoTotal-item.tiempoPromedioElaboracion;
     console.log("tiempo:", this.tiempoTotal)
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

   aplicarFiltros(filterValue: string) {  
     console.log("entre en aplicar filtros");   
     if(this.productos!=undefined){
      console.log("aplicarFiltros", filterValue)
      this.dataSource.filter = filterValue.trim().toLowerCase();      
    
     }
     else{
      this.dataSource.filter = filterValue.trim().toLowerCase();      
     }
     
  }

  //  obtenerCliente(){   
  //   this.data.getListaUsuarios("usuarios").subscribe(lista => {
  //           this.usuarios=lista; 
      
  //           for (let i=0; i<= this.usuarios.length -1; i++){
  //             if (this.usuarios[i].correo==this.correo){
  //               this.nombre=this.usuarios[i].nombre;
  //               this.apellido=this.usuarios[i].apellido;
  //             }
  //           }
            
  //     });
  //  }

   obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista; 
      
    });
    console.log("pedidos: ",this.pedidos)
   }

   guardarPedido(){
    this.obtenerPedidos();
    console.log("cantidad pdidos: ",  this.pedidos.length)
    let data = {
      // correo:localStorage.getItem("usuarioComanda"),
      nombreCliente:this.nombre,
      apellidoCliente:this.apellido,
      estado:"pendiente",
      fecha: new Date(),
      numero: this.pedidos.length + 1,
      productos: this.seleccionados,
      montoTotal:this.montoTotal,
      tiempoElaboracion: this.tiempoTotal,
      foto:"",
      codigo:"",
      mesa:this.codigoMesa
    }
    console.log("pedido a guardar: ", data)
    this.auth.guardarPedido(data).then(res =>{
      this.pedidoRealizado= true;
      this.seleccionados= [];
      this.montoTotal=0;
      this.tiempoTotal=0;
        }).catch(error => {
      console.log(error,"error al guardar el pedido"); 
  });
    
   }

   obtenerUsuario() {
 
    this.usuarioService.EstaLogeado().subscribe(user => {
      if (user) {
        console.log("user.uid obtenido",user.uid)
        this.dataApi.TraerUno(user.uid, 'usuarios').pipe(take(1)).subscribe(userx => {

          if (userx) {
            if (userx.activo) {
              console.log("userx activo reserva:", userx)
              this.usuarioService.usuario = userx;

              this.foto = userx.foto;
              this.correo= userx.correo;
              this.nombre = userx.nombre;
              this.apellido = userx.apellido;
              this.perfil = userx.perfil;
              this.logeado = true;
              
            }
            else {
              this.foto = "";
              this.nombre = "";
              this.correo= "";
              this.apellido = "";
              this.logeado = false;
              this.perfil = null;
            }
          }

        });
      }
      else {
        this.foto = "";
        this.nombre = "";
        this.correo= "";
        this.apellido = "";
        this.logeado = false;
        this.perfil = null;
      }
    });
  }
}
