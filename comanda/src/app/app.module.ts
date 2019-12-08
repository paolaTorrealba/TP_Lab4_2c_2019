import { BrowserModule } from '@angular/platform-browser';
import { RecaptchaModule } from 'ng-recaptcha';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ConfirmarPagoComponent } from './componentes/confirmar-pago/confirmar-pago.component';
import { AltaSocioComponent } from './componentes/alta-socio/alta-socio.component';
import { VerEncuestasComponent } from './componentes/ver-encuestas/ver-encuestas.component';
import { CerrarMesaComponent } from './componentes/cerrar-mesa/cerrar-mesa.component';
import { ListadoProductosComponent } from './componentes/listado-productos/listado-productos.component';
import { VerPedidoClienteComponent } from './componentes/ver-pedido-cliente/ver-pedido-cliente.component';
import { ListadoPedidosComponent } from './componentes/listado-pedidos/listado-pedidos.component';
import { PedidosPendientesCerveceroComponent } from './componentes/pedidos-pendientes-cervecero/pedidos-pendientes-cervecero.component';
import { PedidosPendientesBartenderComponent } from './componentes/pedidos-pendientes-bartender/pedidos-pendientes-bartender.component';
import { PedidosPendientesCocineroComponent } from './componentes/pedidos-pendientes-cocinero/pedidos-pendientes-cocinero.component';
import { FinalizarPedidoCocineroComponent } from './componentes/finalizar-pedido-cocinero/finalizar-pedido-cocinero.component';
import { FinalizarPedidoCerveceroComponent } from './componentes/finalizar-pedido-cervecero/finalizar-pedido-cervecero.component';
import { FinalizarPedidoBartenderComponent } from './componentes/finalizar-pedido-bartender/finalizar-pedido-bartender.component';
import { VerEstadoPedidoComponent } from './componentes/ver-estado-pedido/ver-estado-pedido.component';
import { CancelarPedidoComponent } from './componentes/cancelar-pedido/cancelar-pedido.component';
import { MesaPipe } from './pipes/mesa.pipe';
import { CodigoPipe } from './pipes/codigo.pipe';
import { TipoFilasDirective } from './directivas/tipo-filas.directive';
import { EstadoFilaDirective } from './directivas/estado-fila.directive';
import { MostrarFotoPipe } from './pipes/mostrar-foto.pipe';
import { ColorPedidoPendienteDirective } from './directivas/color-pedido-pendiente.directive';
import { PedidoBartenderComponent } from './filtros/pedido-bartender/pedido-bartender.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PedidoCerveceroComponent } from './filtros/pedido-cervecero/pedido-cervecero.component';
import { PedidoCocineroComponent } from './filtros/pedido-cocinero/pedido-cocinero.component';
import { ProductoTipoComponent } from './filtros/producto-tipo/producto-tipo.component';
import { ExcelMesasComponent } from './componentes/excel-mesas/excel-mesas.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ExcelProductosComponent } from './componentes/excel-productos/excel-productos.component';
import { ExcelEmpleadosComponent } from './componentes/excel-empleados/excel-empleados.component';
import { ListadoEmpleadosComponent } from './componentes/listado-empleados/listado-empleados.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CardReportesComponent } from './componentes/card-reportes/card-reportes.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { ExcelClientesComponent } from './componentes/excel-clientes/excel-clientes.component';
import { CardAbmsComponent } from './componentes/card-abms/card-abms.component';
import { CardListadosComponent } from './componentes/card-listados/card-listados.component';
import { AltasComponent } from './componentes/altas/altas.component';
import { CardAltasComponent } from './componentes/card-altas/card-altas.component';
import { ListadosComponent } from './componentes/listados/listados.component';

@NgModule({
  declarations: [
    AppComponent,
    TipoFilasDirective,
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
    ConfirmarPagoComponent,
    AltaSocioComponent,
    VerEncuestasComponent,
    CerrarMesaComponent,
    ListadoProductosComponent,
    VerPedidoClienteComponent,
    ListadoPedidosComponent,
    PedidosPendientesCerveceroComponent,
    PedidosPendientesBartenderComponent,
    PedidosPendientesCocineroComponent,
    FinalizarPedidoCocineroComponent,
    FinalizarPedidoCerveceroComponent,
    FinalizarPedidoBartenderComponent,
    VerEstadoPedidoComponent,
    CancelarPedidoComponent,
    MesaPipe,
    CodigoPipe,
    TipoFilasDirective,
    EstadoFilaDirective,
    MostrarFotoPipe,
    ColorPedidoPendienteDirective,
    PedidoBartenderComponent,
    PedidoCerveceroComponent,
    ProductoTipoComponent,
    PedidoCocineroComponent,
    ExcelMesasComponent,
    ExcelProductosComponent,
    ExcelClientesComponent,
    ExcelEmpleadosComponent,
    ListadoEmpleadosComponent,
    CardReportesComponent,
    ReportesComponent,
    ExcelClientesComponent,
    CardAbmsComponent,
    CardListadosComponent,    
    AltasComponent,
    CardAltasComponent,
    ListadosComponent,
  ],
  imports: [
    FormsModule,
    NgxSpinnerModule,
    MaterialModule,
    RecaptchaModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    HttpClientModule,
    SimpleNotificationsModule,
    SimpleNotificationsModule.forRoot({
      position: ['top', 'right'],
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    }),

  ],
  exports: [
    MaterialModule,
    SimpleNotificationsModule
  ],
  providers: [AuthProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
