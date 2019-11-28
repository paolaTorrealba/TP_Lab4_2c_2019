import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';

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
  
  constructor(private  data:  AuthService,    
    private auth: AuthProvider) { 
      this.correo=localStorage.getItem("usuarioComanda");
      this.obtenerEncuestas();
      this.info=false;
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
