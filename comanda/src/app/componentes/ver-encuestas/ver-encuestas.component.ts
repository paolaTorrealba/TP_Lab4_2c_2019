import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';

import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DataApiService } from 'src/app/servicios/data-api.service';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Perfil } from 'src/app/clases/enum';

@Component({
  selector: 'app-ver-encuestas',
  templateUrl: './ver-encuestas.component.html',
  styleUrls: ['./ver-encuestas.component.scss']
})
export class VerEncuestasComponent implements OnInit {
  public encuestas:Array<any> = [];
  public detalle:Array<any> = [];
  public correo:string;
  public info:boolean;
  private columsCliente: string[] = ['Correo','Sexo','Puntaje Mesa','Puntaje Restaurante','Puntaje Mozo','Puntaje Cocinero','Comentarios'];
  private dataSource = new MatTableDataSource(this.encuestas);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
  public nombre:string;
  public perfil:Perfil;
  public vacia:boolean;
  
  constructor(private  data:  AuthService,    
    private auth: AuthProvider, 
    private router: Router,
    private usuarioService: UsuarioService,
    private dataApi: DataApiService) {    
      this.obtenerUsuario();   
 
      this.info=false;
    }

    obtenerUsuario() { 
      this.usuarioService.EstaLogeado().subscribe(user => {
        if (user) {       
          this.dataApi.TraerUno(user.uid, 'usuarios')
          .pipe(take(1)).subscribe(userx => {
            if (userx) {
              if (userx.activo) {             
                  this.usuarioService.usuario = userx;             
                  this.correo= userx.correo;
                  this.nombre = userx.nombre;            
                  this.perfil = userx.perfil;    
                  this.obtenerEncuestas(); 
              }
              else {             
                this.nombre = "";
                this.correo= ""; 
                this.perfil = null;
              }
            }
          });
        }
        else {
          this.nombre = "";
          this.correo= "";       
          this.perfil = null;
        }
      });
    }
    obtenerEncuestas(){
    this.data.getListaEncuestas("encuestaCliente").subscribe(lista => {
      this.encuestas=lista; 
      console.log("encuestas: ",this.encuestas); 
    });
    console.log("encuestas: ",this.encuestas)
   }
  ngOnInit() {
  }

 

}
