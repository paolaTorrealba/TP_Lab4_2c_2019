import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {PedidosPendientesComponent} from '../../componentes/pedidos-pendientes/pedidos-pendientes.component';
import {AltaDeProductoComponent} from '../../componentes/alta-de-producto/alta-de-producto.component';
import {EncuestaEmpleadoComponent} from '../../componentes/encuesta-empleado/encuesta-empleado.component';
import {AltaEmpleadoComponent} from '../../componentes/alta-empleado/alta-empleado.component';
import {AltaSupervisorComponent} from '../../componentes/alta-supervisor/alta-supervisor.component';
import {ListaClientesEstadoComponent} from '../../componentes/lista-clientes-estado/lista-clientes-estado.component';
import {ListadoSupervisorComponent} from '../../componentes/listado-supervisor/listado-supervisor.component';
import {ListadoReservaComponent} from '../../componentes/listado-reserva/listado-reserva.component';
import {ConfirmarDeliveryComponent} from '../../componentes/confirmar-delivery/confirmar-delivery.component';
import {AltaDeMesaComponent} from '../../componentes/alta-de-mesa/alta-de-mesa.component';
import {HomeClienteComponent} from '../../componentes/home-cliente/home-cliente.component';
import {PedirPlatosComponent} from '../../componentes/pedir-platos/pedir-platos.component';
import {ReservaComponent} from '../../componentes/reserva/reserva.component';
import { AuthProvider } from 'src/app/providers/auth';
import {ListadoClientesComponent} from '../../componentes/listado-clientes/listado-clientes.component';
import {ListadoMesasComponent} from '../../componentes/listado-mesas/listado-mesas.component';
import {ConfirmarPedidoComponent} from '../../componentes/confirmar-pedido/confirmar-pedido.component';
import { LoginComponent } from '../login/login.component';
import { FinalizarPedidoComponent } from '../finalizar-pedido/finalizar-pedido.component';
import { ConfirmarPagoComponent } from '../confirmar-pago/confirmar-pago.component';
import { AltaSocioComponent } from '../alta-socio/alta-socio.component';
import { VerEncuestasComponent } from '../ver-encuestas/ver-encuestas.component';
import { CerrarMesaComponent } from '../cerrar-mesa/cerrar-mesa.component';
// import {HomeComponent} from '../../componentes/home/home.component';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  acciones: Array<any> = [];
  public email;
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
               console.log("el usuario:",this.usuario);
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
    console.log("el perfil: ",this.perfil);
    console.log("Muestro el menu para este usuario: ",this.usuario);
    switch(this.perfil) {
      case "socio":
        this.acciones = [ 
          { accion: "Agregar Empleado", img: "nuevo-empleado.jpg", ruta: "agregarEmpleado" },
          { accion: "Agregar Socio", img: "nuevo-empleado.jpg", ruta: "agregarSocio" },
          { accion: "Ver encuestas", img: "encuesta.jpg", ruta: "verEncuestas" },
          { accion: "Agregar mesa", img: "ocupar-mesa.jpg", ruta: "agregarMesa" },
          { accion: "Agregar producto", img: "ocupar-mesa.jpg", ruta: "agregarProducto" },
          { accion: "Ver Registro de Clientes", img: "nuevo-empleado.jpg", ruta: "verRegistroClientes" }, 
          { accion: "Cerrar Mesa", img: "repartidor.png", ruta: "cerrarMesa"},
         // { accion: "Confirmar reservas", img: "reserva.jpg", ruta: ListadoReservaComponent },
        ];
        break;
      case "cliente":
        this.acciones = [
                  
          { accion: "Pedir platos y bebidas", img: "pedido.jpg", ruta: "pedirPlatos"},
          { accion: "Paga Factura", img: "pedido.png", ruta: "pagarFactura" },
          { accion: "Encuesta", img: "pedido.png", ruta: "encuestaCliente" },
          { accion: "Ingresar Codigos", img: "pedido.png", ruta: "encuestaCliente" }
          // { accion: "Reservar mesa", img: "reserva.jpg", ruta: "reserva" }, 
        ];
        break;
      case "cocinero": 
        this.acciones = [
          { accion: "Pedidos Pendientes", img: "bandeja.png", ruta: "pedidosPendientes" },
          { accion: "Cerrar Pedido", img: "producto.png", ruta: "finalizarPedido"},
          { accion: "Encuesta empleado", img: "encuesta.jpg", ruta: "encuestaEmpleado"},
        ];        
      break;
      case "bartender":
        this.acciones = [
          { accion: "Pedidos Pendientes", img: "bandeja.png",  ruta: "pedidosPendientes" },
          { accion: "Cerrar Pedido", img: "producto.png", ruta: "finalizarPedido"},
          { accion: "Encuesta empleado", img: "encuesta.jpg",  ruta: "encuestaEmpleado"},
        ];        
        break;     
      case "cervecero":
        this.acciones = [
          { accion: "Pedidos Pendientes", img: "bandeja.png",  ruta: "pedidosPendientes" },
          { accion: "Cerrar Pedido", img: "producto.png", ruta: "finalizarPedido"},
          { accion: "Encuesta empleado", img: "encuesta.jpg",  ruta: "encuestaEmpleado"},
        ];
        break;     
      case "mozo": 
        this.acciones = [
          { accion: "Tomar pedido", img: "pedido.jpg",  ruta: "listadoMesas" },
          { accion: "Aceptar/Entregar pedido", img: "pedido.jpg", ruta: "confirmarPedido"},
          { accion: "Cerrar mesa", img: "encuesta.jpg", ruta: "listadoMesas" },
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

  private cerrarSersion(){
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
