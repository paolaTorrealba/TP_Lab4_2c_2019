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
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { NotificationsService } from 'angular2-notifications';

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
  public tieneReserva:boolean;
  public vacia:boolean;
  public reservas:Array<any> = [];
  public mesas:Array<any> = [];
  public miReserva:any;
  public miMesa:any;
  
  constructor(private  data:  AuthService,    
    private auth: AuthProvider,
    private spinner: NgxSpinnerService,
    private ns: NotificationsService,
    private usuarioService: UsuarioService,
    private dataApi: DataApiService) { 
      this.obtenerUsuario();     
   
    }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
      setTimeout(() => {
          this.spinner.hide();
      }, 5000);
  }

  obtenerPedidos(){
  
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista; 
      console.log("pedidos: ",this.pedidos); 
    });
    console.log("pedidos: ",this.pedidos)
   }

   
cancelar(item){    
   
    item.estado=EstadoPedido.cancelado;
    this.auth.actualizarPedido(item).then(res => {
      this.ns.success("Se cancelo el pedido correctamente");
    }); 
    this.cancelarReservas(item); 
    this.cerrarMesa(item); 
 }

 cerrarMesa(item){ 
   
   console.log(item)
  this.data.getListaMesas("mesas").subscribe(lista => {
        this.mesas=lista; 
        console.log(this.mesas)        
        for(let i=0; i<=this.mesas.length-1; i++){
          if(this.mesas[i].estado==EstadoMesa.reservada &&
            this.mesas[i].codigo==item.codigoMesa ){
            this.miMesa=this.mesas[i];                     
          }
        }         
        this.miMesa.estado=EstadoMesa.cerrada;              
        this.auth.actualizarMesa(this.miMesa).then(res => {
            
        });
  }) 
}
  
cancelarReservas(item) { 
  this.tieneReserva=false; 
  this.data.getListaReservas("reservas").subscribe(lista => {
      this.reservas=lista;         
      for(let i=0; i<=this.reservas.length-1; i++){
        if(this.reservas[i].correo==this.correo &&
          this.reservas[i].estado=="activa" &&
          this.reservas[i].codigoMesa==item.codigoMesa ){
          this.miReserva=this.reservas[i]; 
          this.tieneReserva=true;              
        }
      }         
      if (this.tieneReserva ){
          this.miReserva.estado=EstadoReserva.finalizada;       
          this.auth.actualizarReserva(this.miReserva).then(res =>{
          }).catch(error => {
            this.ns.error("Error al actualizar la reserva");
          });          
      }              
  });
  console.log("reservas: ",this.reservas); 
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

