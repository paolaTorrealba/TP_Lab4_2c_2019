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

  progreso: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  logueado:boolean
  ProgresoDeAncho:string;

  respuestaAuth: boolean;
  repetidor:any;
  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private auth: AuthProvider
  ) {
    this.progreso=0;
    this.ProgresoDeAncho="0%";
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

// Entrar() {
//   if (this.user === 'email' && this.clave === 'admin') {
//     this.router.navigate(['/Principal']);
//   }
// }

Entrar() {

  // this.auth.loginUser(this.user.email,this.user.password ).then((user) => {
  //   this.router.navigate(['/Principal']);
  //   sessionStorage.setItem("user",user.email);
  //   sessionStorage.setItem("muestra","true");
  //   }
  //  this.auth.login(this.user.email,this.user.password );
    console.log(this.user.email);
  
    if (! this.auth.login(this.user.email,this.user.password )){
      console.log("dio falso")
      this.progreso=0;
      this.ProgresoDeAncho="0%";
      this.MostarMensaje("Error al loguearse", true);
      this.logeando = true;
    } 
    else{
      console.log("se logueo",this.user.email )
      localStorage.setItem("usuarioComanda",this.user.email)
    } 
}

entrarComoAdmin()
{
  this.user.email="admin@admin.com";
  this.user.password="12345";

  this.Entrar();
  this.router.navigate(['/principal']);
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
