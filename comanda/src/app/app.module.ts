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
import { AltaSupervisorComponent } from './componentes/alta-supervisor/alta-supervisor.component';
import { ListadoSupervisorComponent } from './componentes/listado-supervisor/listado-supervisor.component';
import { AltaDeMesaComponent } from './componentes/alta-de-mesa/alta-de-mesa.component';
import { ReservaComponent } from './componentes/reserva/reserva.component';
import { PedirPlatosComponent } from './componentes/pedir-platos/pedir-platos.component';
import { ListaClientesEstadoComponent } from './componentes/lista-clientes-estado/lista-clientes-estado.component';
import { ListadoReservaComponent } from './componentes/listado-reserva/listado-reserva.component';
import { ConfirmarDeliveryComponent } from './componentes/confirmar-delivery/confirmar-delivery.component';
import { HomeClienteComponent } from './componentes/home-cliente/home-cliente.component';
import { ListadoClientesComponent } from './componentes/listado-clientes/listado-clientes.component';
import { ConfirmarPedidoComponent } from './componentes/confirmar-pedido/confirmar-pedido.component';
import { ListadoMesasComponent } from './componentes/listado-mesas/listado-mesas.component';
import { HomeComponent } from './componentes/home/home.component';
import { AltaDeClienteComponent } from './componentes/alta-de-cliente/alta-de-cliente.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ListaDeEsperaComponent } from './componentes/lista-de-espera/lista-de-espera.component';
import { HttpClientModule } from '@angular/common/http';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { PieComponent } from './componentes/pie/pie.component';
import { BotonSeleccionadoDirectiva } from '../app/directivas/boton-seleccionado-directiva';



@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    PedidosPendientesComponent,
    AltaDeProductoComponent,
    EncuestaEmpleadoComponent,
    AltaEmpleadoComponent,
    AltaSupervisorComponent,
    ListadoSupervisorComponent,
    AltaDeMesaComponent,
    ReservaComponent,
    PedirPlatosComponent,
    ListaClientesEstadoComponent,
    ListadoReservaComponent,
    ConfirmarDeliveryComponent,
    HomeClienteComponent,
    ListadoClientesComponent,
    ConfirmarPedidoComponent,
    ListadoMesasComponent,
    HomeComponent,
    AltaDeClienteComponent,
    LoginComponent,
    RegistroComponent,
    ListaDeEsperaComponent,
    CabeceraComponent,
    PieComponent,
    BotonSeleccionadoDirectiva,
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
