import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthProvider } from 'src/app/providers/auth';

// import {HomeComponent} from '../../componentes/home/home.component';


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
  public perfil;
  constructor( private router: Router,    
    private auth: AuthProvider) {


      this.email=localStorage.getItem("usuarioComanda"); 

      console.log("email del localstorage", this.email);
      this.auth.getLista('usuarios').subscribe(lista => {
        this.usuarios=lista;   
        console.log("usuarios: ", this.usuarios)  
        for(let i=0;i<this.usuarios.length;i++){
          if(this.usuarios[i].correo == this.email) {
               this.usuario=this.usuarios[i];
               console.log("el usuario en constructor:",this.usuario);
          }
        }
      });
      this.obtenerUsuario();
      this.mostrarMenu();
  }
 

  obtenerUsuario(){
    this.email=localStorage.getItem("usuarioComanda");  
    console.log("email del localstorage", this.email);
    this.auth.getLista('usuarios').subscribe(lista => {
      this.usuarios=lista;   
      console.log("usuarios: ", this.usuarios)  
      for(let i=0;i<this.usuarios.length;i++){
        if(this.usuarios[i].correo == this.email) {
             this.usuario=this.usuarios[i];
             localStorage.setItem("perfilUComanda", this.usuario.perfil);
             console.log("el usuario: ",this.usuario);
        }
      }

    });
  }

  mostrarMenu(){
    this.perfil= localStorage.getItem("perfilUComanda")
    console.log("Menu para el perfil: ",this.perfil);
    console.log("Muestro el menu para este usuario: ",this.usuario);
    switch(this.perfil) {
      case "socio":
        this.acciones = [ 
          { accion: "Reportes", img: "nuevo-empleado.jpg", ruta: "reportes" },
          { accion: "Agregar Empleado", img: "nuevo-empleado.jpg", ruta: "agregarEmpleado" },
          { accion: "Agregar Socio", img: "nuevo-empleado.jpg", ruta: "agregarSocio" },
          { accion: "Ver encuestas", img: "encuesta.jpg", ruta: "verEncuestas" },
          { accion: "Agregar mesa", img: "ocupar-mesa.jpg", ruta: "agregarMesa" },
          { accion: "Agregar producto", img: "ocupar-mesa.jpg", ruta: "agregarProducto" },
          { accion: "Listado mesa", img: "ocupar-mesa.jpg", ruta: "listadoMesas" },
          { accion: "Listado producto", img: "ocupar-mesa.jpg", ruta: "listadoProductos" },
          { accion: "Listado pedidos", img: "ocupar-mesa.jpg", ruta: "listadoPedidos" },
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
         // { accion: "Confirmar reservas", img: "reserva.jpg", ruta: ListadoReservaComponent },
          { accion: "Ver Comentarios", img: "repartidor.png", ruta: "cerrarMesa"},

        ];
        break;
      case "cliente":
        this.acciones = [
                  
          { accion: "Pedir platos y bebidas", img: "pedido.jpg", ruta: "pedirPlatos"},
          { accion: "Paga Factura", img: "pedido.png", ruta: "pagarFactura" },
          { accion: "Encuesta", img: "pedido.png", ruta: "encuestaCliente" },
          { accion: "Ingresar Codigos", img: "pedido.png", ruta: "encuestaCliente" },
          { accion: "Reservar mesa", img: "reserva.jpg", ruta: "reservaCliente" }, 
          { accion: "Ver mi pedido", img: "reserva.jpg", ruta: "verEstadoPedido" },
          { accion: "Cancelar Pedido", img: "reserva.jpg", ruta: "verEstadoPedido" },  
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
    // let alertConfirm = this.error.mostrarMensajeConfimación("¿Quieres cerrar sesión?", "Cerrar sesión");
    // alertConfirm.present();
    // alertConfirm.onDidDismiss((confirm) => {
    //   if (confirm) {
    //     this.cerrarSersion();
    //   }
    // });
  }

  public cerrarSersion(){
    this.auth.logOut();
    // actualizar el estado del usuario a noLogueado.
    // limpiar el local Storage.
    localStorage.setItem("usuarioComanda","");
    localStorage.setItem("perfilUComanda","");
    this.router.navigate(['/login']);
  }

  openComponent(item) {   
    this.router.navigate(['/'+item.ruta]);
    // this.navCtrl.setRoot(item.ruta);
  }

  ngOnInit() {}

  openPage(item) {
    console.log(item);
    this.router.navigate(['/'+item]);
  }

}
