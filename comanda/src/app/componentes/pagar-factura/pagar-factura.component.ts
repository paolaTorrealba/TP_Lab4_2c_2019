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
  selector: 'app-pagar-factura',
  templateUrl: './pagar-factura.component.html',
  styleUrls: ['./pagar-factura.component.scss']
})
export class PagarFacturaComponent implements OnInit {

  public pedidos:Array<any> = [];
  public miPedido: any;
  public entregado:EstadoPedido.entregado;  
  public correo:string;
  public perfil: Perfil;
  public nombre: string;
  public vacia:boolean;
  public pagado:boolean=false;

  constructor(private  data:  AuthService,    
    private auth: AuthProvider,
    private usuarioService: UsuarioService,
    private dataApi: DataApiService) { 
      this.obtenerUsuario();

    }

  ngOnInit() {}


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
  obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista; 
      this.vacia=this.pedidos.length==0;
      console.log(this.correo)
      for(let i=0; i<=this.pedidos.length-1;i++){
        if (this.pedidos[i].correoCliente==this.correo
          && this.pedidos[i].estado==EstadoPedido.recibido)
            this.miPedido=this.pedidos[i]

      }
    });
    console.log("pedidos: ",this.pedidos)
   }

   
   pagar(item){    
    console.log("item: ", item)    
    this.pagado=true;
    item.estado=EstadoPedido.pagado;
    console.log("item: ", item) 
    this.auth.actualizarPedido(item).then(res => {
      console.log("pedido abonado por el cliente")
    });   
    
   
 }
}

