import { Component, OnInit } from '@angular/core';
import { EstadoPedido, Perfil, EstadoReserva, EstadoMesa } from 'src/app/clases/enum';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DataApiService } from 'src/app/servicios/data-api.service';
import { take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
 
  public vacia:boolean;
  public correo:string;
  public perfil: Perfil;
  public nombre: string;
  private columsClientes: string[] = ['Nombre', 'Apellido', 'Perfil','Email', 'Foto'];
  public clientes:Array<any> = []; 
  public usuarios:Array<any> = []; 
  private dataSource = new MatTableDataSource(this.clientes);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
 
  constructor(private  data:  AuthService,    
    private auth: AuthProvider,
    private usuarioService: UsuarioService,
    private dataApi: DataApiService) { 
     
      this.obtenerUsuarios();     
   
    }

  ngOnInit() {
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
               
            }
            else {             
              this.nombre = "";
              this.correo= "";               
            }
          }
        });
      }
      else {
        this.nombre = "";
        this.correo= "";      
       
      }
    });
  }
  obtenerUsuarios(){
    this.data.getListaUsuarios("usuarios").subscribe(lista => {
        this.usuarios=lista;
             console.log("usuarios", this.usuarios)
          for (let i=0; i<=this.usuarios.length-1;i++){
            if(this.usuarios[i].perfil==Perfil.cliente){
              this.clientes.push(this.usuarios[i]);
            }
          }          
                
        this.vacia=this.clientes.length==0;     
        this.dataSource = new MatTableDataSource(this.clientes);      
    });    
   }

}
