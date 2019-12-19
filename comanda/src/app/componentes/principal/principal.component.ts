import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthProvider } from 'src/app/providers/auth';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DataApiService } from 'src/app/servicios/data-api.service';
import { take } from 'rxjs/operators';
import { Perfil } from 'src/app/clases/enum';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  acciones: Array<any> = [];
  public email;
  public elMail:string;
  public usuario;
  public usuarios;
  public perfil: Perfil;

  foto = '';
  nombre = '';
  logeado:boolean;
 


  
  constructor( private router: Router, 
    private usuarioService: UsuarioService,
    private dataApi: DataApiService,   
    private auth: AuthProvider) {

      
      this.obtenerUsuario();
      this.mostrarMenu();
  }
 

  obtenerUsuario() {
 
    this.usuarioService.EstaLogeado().subscribe(user => {
      if (user) {
        console.log("user.uid obtenido",user.uid)
        this.dataApi.TraerUno(user.uid, 'usuarios').pipe(take(1)).subscribe(userx => {

          if (userx) {
            if (userx.activo) {
              console.log("userx activo ok:", userx)
              this.usuarioService.usuario = userx;

              this.foto = userx.foto;
              this.nombre = userx.nombre;
              this.perfil = userx.perfil;
              this.logeado = true;
              console.log("usuario logeado:", userx)
            }
            else {
              this.foto = "";
              this.nombre = "";
              this.logeado = false;
              this.perfil = null;
            }
          }

        });
      }
      else {
        this.foto = "";
        this.nombre = "";
        this.logeado = false;
        this.perfil = null;
      }
    });
  }


  mostrarMenu(){    
    switch(this.perfil) {
      case "socio":
        this.acciones = [ 
          { accion: "Reportes", img: "nuevo-empleado.jpg", ruta: "reporte" },
          { accion: "Listados", img: "nuevo-empleado.jpg", ruta: "listado" },
          { accion: "Altas", img: "nuevo-empleado.jpg", ruta: "alta" },
          { accion: "Reportes Mesas", img: "nuevo-empleado.jpg", ruta: "reporteMesas" },
          { accion: "Reportes Productos", img: "nuevo-empleado.jpg", ruta: "reporteProductos" },
          { accion: "Reportes Empleados", img: "nuevo-empleado.jpg", ruta: "reporteEmpleados" },
          { accion: "Agregar Empleado", img: "nuevo-empleado.jpg", ruta: "agregarEmpleado" },
          { accion: "Agregar Socio", img: "nuevo-empleado.jpg", ruta: "agregarSocio" },
          { accion: "Ver encuestas", img: "encuesta.jpg", ruta: "verEncuestas" },
          { accion: "Agregar mesa", img: "ocupar-mesa.jpg", ruta: "agregarMesa" },
          { accion: "Agregar producto", img: "ocupar-mesa.jpg", ruta: "agregarProducto" },
          { accion: "Listado mesa", img: "ocupar-mesa.jpg", ruta: "listadoMesas" },
          { accion: "Listado producto", img: "ocupar-mesa.jpg", ruta: "listadoProductos" },
          { accion: "Listado clientes", img: "ocupar-mesa.jpg", ruta: "listadoClientes" },
          { accion: "Listado pedidos", img: "ocupar-mesa.jpg", ruta: "listadoPedidos" },
          { accion: "Listado empleados", img: "ocupar-mesa.jpg", ruta: "listadoEmpleados" },
          { accion: "Ver Registro de Clientes", img: "nuevo-empleado.jpg", ruta: "verRegistroClientes" }, 
          { accion: "Cerrar Mesa", img: "repartidor.png", ruta: "cerrarMesa"},
         
          { accion: "Ver Ingresos Empleados", img: "repartidor.png", ruta: "cerrarMesa"},
          { accion: "Ver Operaciones Empleados", img: "repartidor.png", ruta: "cerrarMesa"},
          { accion: "Ver Operaciones por Empleado", img: "repartidor.png", ruta: "cerrarMesa"},
          { accion: "ABM Empleados", img: "repartidor.png", ruta: "cerrarMesa"},

          { accion: "Ver Pedido Mas Vendido", img: "repartidor.png", ruta: "cerrarMesa"},
          { accion: "Ver Pedido Menos Vendido", img: "repartidor.png", ruta: "cerrarMesa"},
          { accion: "Ver Pedidos Con Demora", img: "repartidor.png", ruta: "cerrarMesa"},
          { accion: "Ver Pedido Cancelados", img: "repartidor.png", ruta: "cerrarMesa"},

          { accion: "Uso de Mesas", img: "repartidor.png", ruta: "cerrarMesa"},
          { accion: "Ver Facturacion por Mesa", img: "repartidor.png", ruta: "cerrarMesa"},
          { accion: "Ver Importes por Mesas", img: "repartidor.png", ruta: "cerrarMesa"},
          { accion: "Ver Facturacion por Fecha", img: "repartidor.png", ruta: "cerrarMesa"},
          { accion: "Ver Comentarios", img: "repartidor.png", ruta: "cerrarMesa"},

        ];
        break;
      case "cliente":
        this.acciones = [                  
          { accion: "Pedir platos y bebidas", img: "pedido.jpg", ruta: "pedirPlatos"},
          { accion: "Paga Factura", img: "pedido.png", ruta: "pagarFactura" },
          { accion: "Encuesta", img: "pedido.png", ruta: "encuestaCliente" },
          { accion: "Reservar mesa", img: "reserva.jpg", ruta: "reservaCliente" }, 
          { accion: "Ver mi pedido", img: "reserva.jpg", ruta: "verEstadoPedido" },
          { accion: "Cancelar Pedido", img: "reserva.jpg", ruta: "cancelar" },  
        ];
        break;
      case "cocinero": 
        this.acciones = [
          { accion: "Pedidos Pendientes", img: "bandeja.png", ruta: "pedidosPendientesCocinero" },
          { accion: "Cerrar Pedido", img: "producto.png", ruta: "finalizarPedidoCocinero"},
          { accion: "Encuesta empleado", img: "encuesta.jpg", ruta: "encuestaEmpleado"},
        ];        
      break;
      case "bartender":
        this.acciones = [
          { accion: "Pedidos Pendientes", img: "bandeja.png",  ruta: "pedidosPendientesBartender" },
          { accion: "Cerrar Pedido", img: "producto.png", ruta: "finalizarPedidoBartender"},
          { accion: "Encuesta empleado", img: "encuesta.jpg",  ruta: "encuestaEmpleado"},
        ];        
        break;     
      case "cervecero":
        this.acciones = [
          { accion: "Pedidos Pendientes", img: "bandeja.png",  ruta: "pedidosPendientesCervecero" },
          { accion: "Cerrar Pedido", img: "producto.png", ruta: "finalizarPedidoCervecero"},
          { accion: "Encuesta empleado", img: "encuesta.jpg",  ruta: "encuestaEmpleado"},
        ];
        break;     
      case "mozo": 
        this.acciones = [
          { accion: "Tomar pedido", img: "pedido.jpg",  ruta: "pedidosPendientes" },
          { accion: "Entregar pedido", img: "pedido.jpg", ruta: "entregarPedido"},
          { accion: "Cerrar mesa", img: "encuesta.jpg", ruta: "cerrarMesa" },
          { accion: "Confirmar pago", img: "encuesta.jpg", ruta: "confirmarPagoComponent" },
          { accion: "Encuesta empleado", img: "encuesta.jpg",  ruta: "encuestaEmpleado"},
          
          // { accion: "Aceptar clientes en lista de espera", img: "qr.jpg", ruta: ListadoClientesComponent},
        ]
        break;        
      }
  }
  ionViewDidLoad() {
  }

  logout(){
    console.log("falta hacer el logout");
    
  }

  public cerrarSersion(){
    this.auth.logOut();
   
    this.router.navigate(['/login']);
  }

  openComponent(item) {   
    this.router.navigate(['/'+item.ruta]);
   
  }

  ngOnInit() {
    this.obtenerUsuario();
  }

  openPage(item) {
    console.log(item);
    this.router.navigate(['/'+item]);
  }

}
