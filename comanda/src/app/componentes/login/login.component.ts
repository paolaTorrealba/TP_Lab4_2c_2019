import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthProvider } from 'src/app/providers/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // nombreModel: string;
  // apellidoModel: string
  // dniModel: string;
  // claveModel:string;
  // emailModel:string;
  // passwordModel
  // constructor() { }

  // ngOnInit() {
  // }

  // crearTest() {
  //   this.nombreModel = "admin";
  //   this.apellidoModel = "admin";
  //   this.emailModel = "admin@admin.com";
  //   this.passwordModel = "13456";
  
  // }


  private subscription: Subscription;
  tipoUser:string;
  user= { email : '', password : ''};
  mensaje:string;
  semuestra:boolean; 
  logueado:boolean

  respuestaAuth: boolean;
  repetidor:any;
  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private auth: AuthProvider
  ) {

    localStorage.setItem("mesaCliente","sinMesa");
    const session = sessionStorage.getItem('user');
    if(session==null)
    {
    this.logueado=false;
    }
    else{
    this.logueado=true;  
    }

}

ngOnInit() {
}


entrar() {  
    console.log("usuario que ingres: ",this.user.email);  
    if (! this.auth.login(this.user.email,this.user.password )){
      console.log("Error al loguearse")
      this.MostarMensaje("Error al loguearse", true);
  
    } 
    else{
      console.log("se logueo",this.user.email )
      localStorage.setItem("usuarioComanda",this.user.email)
      this.router.navigate(['/principal']);
    } 
}

ingresoSocio(){
  this.user.email="socio@socio.com";
  this.user.password="111111";
  localStorage.setItem("perfilUComanda","socio")
  // this.Entrar();
  // this.router.navigate(['/principal']);
}

ingresoCliente(){
  this.user.email="cliente@cliente.com";
  this.user.password="222222";
  localStorage.setItem("perfilUComanda","cliente")
  // this.Entrar();
  // this.router.navigate(['/principal']);
}

ingresoMozo(){
  this.user.email="mozo@mozo.com";
  this.user.password="333333";
  localStorage.setItem("perfilUComanda","mozo")
  // this.Entrar();
  // this.router.navigate(['/principal']);
}

ingresoBartender(){
  this.user.email="bartender@bartender.com";
  this.user.password="444444";
  localStorage.setItem("perfilUComanda","bartender")
  // this.Entrar();
  // this.router.navigate(['/principal']);
}

ingresoCocinero(){
  this.user.email="cocinero@cocinero.com";
  this.user.password="555555";
  localStorage.setItem("perfilUComanda","cocinero")
  // this.Entrar();
  // this.router.navigate(['/principal']);
}

ingresoCervecero(){
  this.user.email="cervecero@cervecero.com";
  this.user.password="666666";
  localStorage.setItem("perfilUComanda","cervecero")
  // this.Entrar();
  // this.router.navigate(['/principal']);
}


MostarMensaje(mensaje:string,gano:boolean) {
  this.mensaje = mensaje;
 var x = document.getElementById("snackbar");
 if(gano)
     x.className = "show Ganador";
 var modelo = this;
 setTimeout(function(){ 
   x.className = x.className.replace("show", "");
   //modelo.ocultarVerificar=false;
  }, 3000);
 console.info("objeto",x);

} 

entrarComoInvitado()
{
    this.user.email="invitado@gmail.com";
    this.user.password="12345";
  
}
}
