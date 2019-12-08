import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { AuthProvider } from 'src/app/providers/auth';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  user= { email : '', password : ''};
  mensaje:string;
  semuestra:boolean; 
  logueado:boolean

  respuestaAuth: boolean;
  repetidor:any;


  
  constructor(private  usuarioService: UsuarioService,
  private route: ActivatedRoute,
  private router: Router,
  private auth: AuthProvider
  ) {}

ngOnInit() {}

Logearse() { 
   this.usuarioService.loguearUsuario(this.user.email, this.user.password);
   console.log("usuario logueado: ",this.user.email); 
} 
    

ingresoSocio(){
  this.user.email="socio@socio.com";
  this.user.password="111111";
 
}

ingresoCliente(){
  this.user.email="cliente@cliente.com";
  this.user.password="222222";
  
}

ingresoMozo(){
  this.user.email="mozo@mozo.com";
  this.user.password="333333";
  
}

ingresoBartender(){
  this.user.email="bartender@bartender.com";
  this.user.password="444444";
 
}

ingresoCocinero(){
  this.user.email="cocinero@cocinero.com";
  this.user.password="555555";
}

ingresoCervecero(){
  this.user.email="cervecero@cervecero.com";
  this.user.password="666666";
 
}


entrarComoInvitado()
{
    this.user.email="invitado@gmail.com";
    this.user.password="12345";
  
}
}
