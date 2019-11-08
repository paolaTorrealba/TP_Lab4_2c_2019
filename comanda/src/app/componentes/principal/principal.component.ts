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
      case "cocinero": console.log("es cocinero");
      case "bartender":
        this.acciones = [
          { accion: "Pedidos Pendientes", img: "bandeja.png", ruta: PedidosPendientesComponent },
          { accion: "Nuevo producto", img: "producto.png", ruta: AltaDeProductoComponent },
          { accion: "Encuesta empleado", img: "encuesta.jpg", ruta: EncuestaEmpleadoComponent },
        ];        
        break;
      case "supervisor":
        this.acciones = [ 
          { accion: "Agregar un empleado", img: "nuevo-empleado.jpg", ruta: AltaEmpleadoComponent },
          { accion: "Nuevo Supervisor", img: "nuevo-empleado.jpg", ruta: AltaSupervisorComponent },
          { accion: "Confeccionar y ver encuestas", img: "encuesta.jpg", ruta: ListadoSupervisorComponent },
          { accion: "Nueva mesa", img: "ocupar-mesa.jpg", ruta: AltaDeMesaComponent },
          { accion: "Ver Estado de Registro de Clientes", img: "nuevo-empleado.jpg", ruta: ListaClientesEstadoComponent },  // quitar despues, es solo para prueba
          { accion: "Confirmar reservas", img: "reserva.jpg", ruta: ListadoReservaComponent },
          { accion: "Confirmar pedido por delivery", img: "repartidor.png", ruta: ConfirmarDeliveryComponent },
        ];
        break;
      case "cliente anonimo":
        this.acciones = [
          { accion: "Leer código QR", img: "qr.jpg", ruta: HomeClienteComponent },
         
        ];
        break;
      case "cliente":
        this.acciones = [
          { accion: "Reservar", img: "reserva.jpg", ruta: ReservaComponent },
          { accion: "Leer código QR", img: "qr.jpg", ruta: HomeClienteComponent },
          { accion: "Pedir platos y bebidas", img: "pedido.jpg", ruta: PedirPlatosComponent},
          { accion: "Pedir por delivery", img: "pedido.jpg", ruta: PedirPlatosComponent},
          // { accion: "Estado pedido delivery y chat con el repartidor", img: "chat.png", ruta: MapaRutaComponent},
          // { accion: "Juego Adivina", img: "ahorcado.png", ruta: JuegoAdivinaNumeroComponent }
         
          
        ];
        break;
      case "mozo": 
        this.acciones = [
          { accion: "Tomar pedido", img: "pedido.jpg", ruta: ListadoMesasComponent},
          { accion: "Aceptar/Entregar pedido", img: "pedido.jpg", ruta: ConfirmarPedidoComponent},
          { accion: "Aceptar clientes en lista de espera", img: "qr.jpg", ruta: ListadoClientesComponent},
          { accion: "Encuesta empleado", img: "encuesta.jpg", ruta: EncuestaEmpleadoComponent },
        ]
        break;
      case 'repartidor':
          this.acciones = [
            // { accion: "Mapa ruta", img: "mapa.jpg", ruta: MapaRutaComponent},
          ]
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
    this.router.navigate(['/'+LoginComponent]);
    // this.navCtrl.setRoot(HomeComponent, { 'fromApp': true });
  }

  openComponent(item) {
    if(item.accion == 'Pedir por delivery') {
      localStorage.setItem('delivery','true');
    }
    else {
      localStorage.setItem('delivery','false');
    }
    
    this.router.navigate(['/'+item.ruta]);
    // this.navCtrl.setRoot(item.ruta);
  }

  ngOnInit() {
  }

}
