import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AuthProvider } from './providers/auth';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { PedidosPendientesComponent } from './componentes/pedidos-pendientes/pedidos-pendientes.component';
import { AltaDeProductoComponent } from './componentes/alta-de-producto/alta-de-producto.component';
import { EncuestaEmpleadoComponent } from './componentes/encuesta-empleado/encuesta-empleado.component';
import { AltaEmpleadoComponent } from './componentes/alta-empleado/alta-empleado.component';
import { ListadoSupervisorComponent } from './componentes/listado-supervisor/listado-supervisor.component';
import { AltaDeMesaComponent } from './componentes/alta-de-mesa/alta-de-mesa.component';
import { ReservaComponent } from './componentes/reserva/reserva.component';
import { PedirPlatosComponent } from './componentes/pedir-platos/pedir-platos.component';
import { ListaClientesEstadoComponent } from './componentes/lista-clientes-estado/lista-clientes-estado.component';
import { ListadoReservaComponent } from './componentes/listado-reserva/listado-reserva.component';
import { HomeClienteComponent } from './componentes/home-cliente/home-cliente.component';
import { ListadoClientesComponent } from './componentes/listado-clientes/listado-clientes.component';
import { ConfirmarPedidoComponent } from './componentes/confirmar-pedido/confirmar-pedido.component';
import { ListadoMesasComponent } from './componentes/listado-mesas/listado-mesas.component';
import { HomeComponent } from './componentes/home/home.component';
import { AltaDeClienteComponent } from './componentes/alta-de-cliente/alta-de-cliente.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HttpClientModule } from '@angular/common/http';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { PieComponent } from './componentes/pie/pie.component';
import { BotonSeleccionadoDirectiva } from '../app/directivas/boton-seleccionado-directiva';
import { PagarFacturaComponent } from './componentes/pagar-factura/pagar-factura.component';
import { EncuestaClienteComponent } from './componentes/encuesta-cliente/encuesta-cliente.component';
import { FinalizarPedidoComponent } from './componentes/finalizar-pedido/finalizar-pedido.component';
import { ConfirmarPagoComponent } from './componentes/confirmar-pago/confirmar-pago.component';
import { AltaSocioComponent } from './componentes/alta-socio/alta-socio.component';
import { VerEncuestasComponent } from './componentes/ver-encuestas/ver-encuestas.component';
import { CerrarMesaComponent } from './componentes/cerrar-mesa/cerrar-mesa.component';
import { ListadoProductosComponent } from './componentes/listado-productos/listado-productos.component';
import { VerPedidoClienteComponent } from './componentes/ver-pedido-cliente/ver-pedido-cliente.component';
import { ListadoPedidosComponent } from './componentes/listado-pedidos/listado-pedidos.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    PedidosPendientesComponent,
    AltaDeProductoComponent,
    EncuestaEmpleadoComponent,
    AltaEmpleadoComponent, 
    ListadoSupervisorComponent,
    AltaDeMesaComponent,
    ReservaComponent,
    PedirPlatosComponent,
    ListaClientesEstadoComponent,
    ListadoReservaComponent,
    HomeClienteComponent,
    ListadoClientesComponent,
    ConfirmarPedidoComponent,
    ListadoMesasComponent,
    HomeComponent,
    AltaDeClienteComponent,
    LoginComponent,
    RegistroComponent,
    CabeceraComponent,
    PieComponent,
    BotonSeleccionadoDirectiva,
    PagarFacturaComponent,
    EncuestaClienteComponent,
    FinalizarPedidoComponent,
    ConfirmarPagoComponent,
    AltaSocioComponent,
    VerEncuestasComponent,
    CerrarMesaComponent,
    ListadoProductosComponent,
    VerPedidoClienteComponent,
    ListadoPedidosComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    HttpClientModule

  ],
  providers: [ AuthProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
