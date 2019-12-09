import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PedidosPendientesComponent} from './componentes/pedidos-pendientes/pedidos-pendientes.component';
import {AltaDeProductoComponent} from './componentes/alta-de-producto/alta-de-producto.component';
import {EncuestaEmpleadoComponent} from './componentes/encuesta-empleado/encuesta-empleado.component';
import {AltaEmpleadoComponent} from './componentes/alta-empleado/alta-empleado.component';
import {ListaClientesEstadoComponent} from './componentes/lista-clientes-estado/lista-clientes-estado.component';
import {ListadoSupervisorComponent} from './componentes/listado-supervisor/listado-supervisor.component';
import {ListadoReservaComponent} from './componentes/listado-reserva/listado-reserva.component';
import {AltaDeMesaComponent} from './componentes/alta-de-mesa/alta-de-mesa.component';
import {PedirPlatosComponent} from './componentes/pedir-platos/pedir-platos.component';
import {ReservaComponent} from './componentes/reserva/reserva.component';
import { AuthProvider } from 'src/app/providers/auth';
import {ListadoClientesComponent} from './componentes/listado-clientes/listado-clientes.component';
import {ListadoMesasComponent} from './componentes/listado-mesas/listado-mesas.component';
import {ConfirmarPedidoComponent} from './componentes/confirmar-pedido/confirmar-pedido.component';
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
import { VerEstadoPedidoComponent } from './componentes/ver-estado-pedido/ver-estado-pedido.component';
import { TipoFilasDirective } from './directivas/tipo-filas.directive';
import { ExcelMesasComponent } from './componentes/excel-mesas/excel-mesas.component';
import { CancelarPedidoComponent } from './componentes/cancelar-pedido/cancelar-pedido.component';
import { ExcelProductosComponent } from './componentes/excel-productos/excel-productos.component';
import { ExcelEmpleadosComponent } from './componentes/excel-empleados/excel-empleados.component';
import { ListadoEmpleadosComponent } from './componentes/listado-empleados/listado-empleados.component';
import { CardReportesComponent } from './componentes/card-reportes/card-reportes.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { ExcelClientesComponent } from './componentes/excel-clientes/excel-clientes.component';
import { AltasComponent } from './componentes/altas/altas.component';
import { CardAltasComponent } from './componentes/card-altas/card-altas.component';
import { CardListadosComponent } from './componentes/card-listados/card-listados.component';
import { ListadosComponent } from './componentes/listados/listados.component';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },   
  { path: 'principal', component: PrincipalComponent },  
  { path: 'menuprincipal', component: PrincipalComponent },  
  { path: 'registro', component: RegistroComponent},
  // { path: 'listaEspera', component: ListaDeEsperaComponent},

  // SOCIO

  
  { path: 'reporte', component: ReportesComponent, 
  children:
      [{path: '' , component: CardReportesComponent},
       { path: 'reporteMesas', component: ExcelMesasComponent},
       { path: 'reporteEmpleados', component: ExcelEmpleadosComponent},
       { path: 'reporteProductos', component: ExcelProductosComponent},
       { path: 'reporteClientes', component: ExcelClientesComponent}  
   ]},
   { path: 'alta', component: AltasComponent, 
    children:
      [{path: '' , component: CardAltasComponent},
      { path: 'agregarMesa', component: AltaDeMesaComponent},   
      { path: 'agregarSocio', component: AltaSocioComponent},
      { path: 'agregarEmpleado', component: AltaEmpleadoComponent}, 
      { path: 'agregarProducto', component: AltaDeProductoComponent}  
   ]},
   { path: 'listado', component: ListadosComponent, 
    children:
      [{path: '' , component: CardListadosComponent},
      { path: 'listadoMesas', component: ListadoMesasComponent},
      { path: 'listadoClientes', component: ListadoClientesComponent},
      { path: 'listadoEmpleados', component: ListadoEmpleadosComponent},
      { path: 'listadoProductos', component: ListadoProductosComponent},
      { path: 'listadoPedidos', component: ListadoPedidosComponent}, 
   ]},
 
  { path: 'pedidosPendientes', component: PedidosPendientesComponent},
  { path: 'verEncuestas', component: VerEncuestasComponent},
   
  

  // CLIENTE
  
  { path: 'cancelar', component: CancelarPedidoComponent},
  { path: 'pagarFactura', component: PagarFacturaComponent},
  { path: 'encuestaCliente', component: EncuestaClienteComponent},
  { path: 'reservaCliente', component: ReservaComponent},
  { path: 'pedirPlatos', component: PedirPlatosComponent},
  { path: 'verEstadoPedido', component: VerEstadoPedidoComponent}, 

  // MOZO
  { path: 'encuestaEmpleado', component: EncuestaEmpleadoComponent},
  { path: 'pedidosPendientes', component: PedidosPendientesComponent},
  { path: 'cerrarMesa', component: CerrarMesaComponent},
  { path: 'verRegistroClientes', component: ListaClientesEstadoComponent},  
  { path: 'confirmarPago', component: ConfirmarPagoComponent},
  { path: 'entregarPedido', component: ConfirmarPedidoComponent},

   // CERVECERO
   { path: 'encuestaEmpleado', component: EncuestaEmpleadoComponent},
   { path: 'pedidosPendientesCervecero', component: PedidosPendientesCerveceroComponent}, 
   { path: 'finalizarPedidoCervecero', component: FinalizarPedidoCerveceroComponent}, 
  
   // BARTENDER
   { path: 'encuestaEmpleado', component: EncuestaEmpleadoComponent},
   { path: 'pedidosPendientesBartender', component: PedidosPendientesBartenderComponent}, 
   { path: 'finalizarPedidoBartender', component: FinalizarPedidoBartenderComponent},
  
   // COCINERO  
   { path: 'encuestaEmpleado', component: EncuestaEmpleadoComponent},
   { path: 'pedidosPendientesCocinero', component: PedidosPendientesCocineroComponent}, 
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
