import { Component, OnInit } from '@angular/core';
import { EstadoPedido, Perfil } from 'src/app/clases/enum';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DataApiService } from 'src/app/servicios/data-api.service';
import { take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-cancelar-pedido',
  templateUrl: './cancelar-pedido.component.html',
  styleUrls: ['./cancelar-pedido.component.scss']
})
export class CancelarPedidoComponent implements OnInit {
  public pedidos:Array<any> = [];
  public correo:string;
  public perfil: Perfil;
  public nombre: string;
  public vacia:boolean;
  
  constructor(private  data:  AuthService,    
    private auth: AuthProvider,
    private usuarioService: UsuarioService,
    private dataApi: DataApiService) { 
      this.obtenerUsuario();     
   
    }

  ngOnInit() {}

  obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista; 
      console.log("pedidos: ",this.pedidos); 
    });
    console.log("pedidos: ",this.pedidos)
   }

   
   cancelar(item){    
    console.log("item: ", item)   
   
    item.estado=EstadoPedido.cancelado;
    console.log("item: ", item) 
    this.auth.actualizarPedido(item).then(res => {
      console.log("pedido cancelado por el cliente")
    });     
   
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
              this.obtenerPedidos(); 
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
}

