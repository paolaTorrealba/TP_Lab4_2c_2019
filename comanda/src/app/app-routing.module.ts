import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {PedidosPendientesComponent} from './componentes/pedidos-pendientes/pedidos-pendientes.component';
import {AltaDeProductoComponent} from './componentes/alta-de-producto/alta-de-producto.component';
import {EncuestaEmpleadoComponent} from './componentes/encuesta-empleado/encuesta-empleado.component';
import {AltaEmpleadoComponent} from './componentes/alta-empleado/alta-empleado.component';
import {ListaClientesEstadoComponent} from './componentes/lista-clientes-estado/lista-clientes-estado.component';
import {ListadoSupervisorComponent} from './componentes/listado-supervisor/listado-supervisor.component';
import {ListadoReservaComponent} from './componentes/listado-reserva/listado-reserva.component';
import {AltaDeMesaComponent} from './componentes/alta-de-mesa/alta-de-mesa.component';
import {HomeClienteComponent} from './componentes/home-cliente/home-cliente.component';
import {PedirPlatosComponent} from './componentes/pedir-platos/pedir-platos.component';
import {ReservaComponent} from './componentes/reserva/reserva.component';
import { AuthProvider } from 'src/app/providers/auth';
import {ListadoClientesComponent} from './componentes/listado-clientes/listado-clientes.component';
import {ListadoMesasComponent} from './componentes/listado-mesas/listado-mesas.component';
import {ConfirmarPedidoComponent} from './componentes/confirmar-pedido/confirmar-pedido.component';
import {HomeComponent} from './componentes/home/home.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { PagarFacturaComponent } from './componentes/pagar-factura/pagar-factura.component';
import { EncuestaClienteComponent } from './componentes/encuesta-cliente/encuesta-cliente.component';
import { CerrarMesaComponent } from './componentes/cerrar-mesa/cerrar-mesa.component';
import { AltaSocioComponent } from './componentes/alta-socio/alta-socio.component';
import { VerEncuestasComponent } from './componentes/ver-encuestas/ver-encuestas.component';
import { ConfirmarPagoComponent } from './componentes/confirmar-pago/confirmar-pago.component';
import { ListadoProductosComponent } from './componentes/listado-productos/listado-productos.component';
import { ListadoPedidosComponent } from './componentes/listado-pedidos/listado-pedidos.component';
import { PedidosPendientesCerveceroComponent } from './componentes/pedidos-pendientes-cervecero/pedidos-pendientes-cervecero.component';
import { PedidosPendientesBartenderComponent } from './componentes/pedidos-pendientes-bartender/pedidos-pendientes-bartender.component';
import { PedidosPendientesCocineroComponent } from './componentes/pedidos-pendientes-cocinero/pedidos-pendientes-cocinero.component';
import { FinalizarPedidoCerveceroComponent } from './componentes/finalizar-pedido-cervecero/finalizar-pedido-cervecero.component';
import { FinalizarPedidoBartenderComponent } from './componentes/finalizar-pedido-bartender/finalizar-pedido-bartender.component';
import { FinalizarPedidoCocineroComponent } from './componentes/finalizar-pedido-cocinero/finalizar-pedido-cocinero.component';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },  
  { path: 'home', component: HomeComponent },  
  { path: 'principal', component: PrincipalComponent },  
  { path: 'menuprincipal', component: PrincipalComponent },  
  { path: 'registro', component: RegistroComponent},
  // { path: 'listaEspera', component: ListaDeEsperaComponent},
  { path: 'reservaCliente', component: ReservaComponent},
  { path: 'pedirPlatos', component: PedirPlatosComponent},
  { path: 'pagarFactura', component: PagarFacturaComponent},
  { path: 'encuestaCliente', component: EncuestaClienteComponent},
  { path: 'encuestaEmpleado', component: EncuestaEmpleadoComponent},
  { path: 'cerrarMesa', component: CerrarMesaComponent},
  { path: 'encuestaCliente', component: EncuestaClienteComponent},
  { path: 'pedidosPendientes', component: PedidosPendientesComponent},
  { path: 'agregarMesa', component: AltaDeMesaComponent},
  { path: 'verRegistroClientes', component: ListaClientesEstadoComponent},
  { path: 'verEncuestas', component: VerEncuestasComponent},
  { path: 'agregarSocio', component: AltaSocioComponent},
  { path: 'agregarEmpleado', component: AltaEmpleadoComponent},
  { path: 'confirmarPago', component: ConfirmarPagoComponent},
  { path: 'listadoMesas', component: ListadoMesasComponent},
  { path: 'listadoProductos', component: ListadoProductosComponent},
  { path: 'listadoPedidos', component: ListadoPedidosComponent},
  { path: 'entregarPedido', component: ConfirmarPedidoComponent},
  { path: 'agregarProducto', component: AltaDeProductoComponent}, 
  { path: 'pedidosPendientesCervecero', component: PedidosPendientesCerveceroComponent}, 
  { path: 'pedidosPendientesBartender', component: PedidosPendientesBartenderComponent}, 
  { path: 'pedidosPendientesCocinero', component: PedidosPendientesCocineroComponent}, 
  { path: 'finalizarPedidoCervecero', component: FinalizarPedidoCerveceroComponent}, 
  { path: 'finalizarPedidoBartender', component: FinalizarPedidoBartenderComponent},
  { path: 'finalizarPedidoCocinero', component: FinalizarPedidoCocineroComponent},
  
  
  
  
  
  // {
    // path: 'estadisticas',
    // // component: EstadisticasComponent,
    // // canActivate: [AuthGuardService],
    // children:
    //   [
    //     { path: 'empleados', component: InicioComponent },
    //     { path: 'turnos', component: InicioComponent },
    //     { path: 'especialidades', component: InicioComponent }
    //   ]
  // },
  { path: 'administracion', component: ListadoClientesComponent},
  // { path: '404', component: Error404Component },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
