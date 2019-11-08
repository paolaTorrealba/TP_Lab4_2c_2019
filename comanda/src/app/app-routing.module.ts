import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {PedidosPendientesComponent} from './componentes/pedidos-pendientes/pedidos-pendientes.component';
import {AltaDeProductoComponent} from './componentes/alta-de-producto/alta-de-producto.component';
import {EncuestaEmpleadoComponent} from './componentes/encuesta-empleado/encuesta-empleado.component';
import {AltaEmpleadoComponent} from './componentes/alta-empleado/alta-empleado.component';
import {AltaSupervisorComponent} from './componentes/alta-supervisor/alta-supervisor.component';
import {ListaClientesEstadoComponent} from './componentes/lista-clientes-estado/lista-clientes-estado.component';
import {ListadoSupervisorComponent} from './componentes/listado-supervisor/listado-supervisor.component';
import {ListadoReservaComponent} from './componentes/listado-reserva/listado-reserva.component';
import {ConfirmarDeliveryComponent} from './componentes/confirmar-delivery/confirmar-delivery.component';
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
import { ListaDeEsperaComponent } from './componentes/lista-de-espera/lista-de-espera.component';
import { LoginComponent } from './componentes/login/login.component';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },  
  { path: 'home', component: HomeComponent },  
  { path: 'principal', component: PrincipalComponent },  
  { path: 'menuprincipal', component: PrincipalComponent },  
  { path: 'registro', component: RegistroComponent},
  { path: 'listaEspera', component: ListaDeEsperaComponent},
  { path: 'reserva', component: ReservaComponent},
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
