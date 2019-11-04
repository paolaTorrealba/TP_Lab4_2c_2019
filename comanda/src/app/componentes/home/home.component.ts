import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProvider } from 'src/app/providers/auth';
import { PrincipalComponent } from '../principal/principal.component';
import { AltaDeClienteComponent} from '../alta-de-cliente/alta-de-cliente.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public email:string;
  public pass:string;
  mostrarSpiner: boolean = false;
  //splash = true;
  usuarios;
  anonimo: boolean = false;
  nombre: string;
  botonUsuarios="";
  agrandar="";
  constructor(private router: Router,
    private data:AuthProvider) {
      this.usuarios = new Array();
      localStorage.clear();
  }

 

  entrarComoAnonimo(){
    if(this.nombre != undefined){
      let usuario = {
        'nombre': this.nombre,
        'tipo': "cliente anonimo",
        'perfil': "cliente anonimo", 
        'estado': "Aprobado",
      };
      localStorage.setItem("usuario", JSON.stringify(usuario));
      this.router.navigate(['/'+PrincipalComponent,{usuario : usuario}]);
      // this.navCtrl.setRoot(PrincipalComponent, {usuario : usuario});
    }else{
      console.log("mostrar un alert");
      // this.serviceAlert.mostrarError("Debe ingresar un nombre de usuario");
    }
  }

  DesplegarUsuarios() {
    this.botonUsuarios = "ocultar";
    this.agrandar = "agrandar";
  }

  SetearUsuario(email: string, password: string) {
    this.email = email;
    this.pass = password;
    this.NoDesplegarUsuarios();
  }

  NoDesplegarUsuarios() {

    setTimeout(() => {
      this.botonUsuarios = "";
    }, 500);

    this.agrandar = "";
  }

  aceptar() {
    if(this.validForm()) {
      this.mostrarSpiner=true;
      
      this.data.login(this.email,this.pass).then(res => {
        this.data.getLista('usuarios').subscribe(lista => {
          this.usuarios=lista;
          console.log(this.usuarios);
          let flag = false;
          for(let i=0;i<this.usuarios.length;i++)
          {
            if(this.usuarios[i].correo == this.email) {
              if(this.usuarios[i].tipo != 'cliente' || (this.usuarios[i].tipo == 'cliente' && this.usuarios[i].estado == "Aprobado")){
                flag = true;
                let usuario = this.usuarios[i];
                localStorage.setItem("usuario", JSON.stringify(usuario));
                this.mostrarSpiner=false;
                this.router.navigate(['/'+PrincipalComponent,{usuario : res}]);
                // this.navCtrl.setRoot(PrincipalComponent, {usuario : res});
              }
              
            }
          }
          if(!flag) {
            console.log("mostrar alert");
            // this.serviceAlert.mostrarError("El usuario no existe");
            this.mostrarSpiner=false;
          }
          
        })
        
      }).catch(error => {
        this.mostrarSpiner=false;
        console.log("mostrar alert");
        // this.serviceAlert.mostrarError(error,"Error al iniciar sesión");
      });
    }
  }

  private validForm(){
    if(this.pass && this.email){
      return true;
    }
    console.log("mostrar alert - Todos los campos son obligatorios");
    // this.serviceAlert.mostrarErrorLiteral("Todos los campos son obligatorios", "Error al registrarse");
    return false;
  }

  register() {
    this.router.navigate(['/'+AltaDeClienteComponent]);
    // this.navCtrl.setRoot(AltaClienteComponent);
  }
  ngOnInit() {
  }
}

 


