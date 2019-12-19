import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, empty } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { EstadoMesa, EstadoReserva, EstadoPedido, Perfil } from 'src/app/clases/enum';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DataApiService } from 'src/app/servicios/data-api.service';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-cerrar-mesa',
  templateUrl: './cerrar-mesa.component.html',
  styleUrls: ['./cerrar-mesa.component.scss']
})
export class CerrarMesaComponent implements OnInit {
  public mesas:Array<any> = [];
  public mesasParaCerrar:Array<any> = [];
  
  public mesa;
  public reservas:Array<any> = [];
  public pedidosCerrados:Array<any> = [];
  public pedidos:Array<any> = [];
  public estado:string=EstadoMesa.cerrada;
  public activa:string="activa";
  public vacia: boolean;
  public correo:string;
  public perfil: Perfil;
  public nombre: string;
  private columsMesa: string[] = [ 'Codigo','Estado','Cerrar'];
  private dataSource = new MatTableDataSource(this.mesasParaCerrar);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));

  constructor(private  data:  AuthService,
    private usuarioService: UsuarioService,
    private dataApi: DataApiService,   
    private auth: AuthProvider) { 
    this.obtenerUsuario();
    this.obtenerMesas();
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
                this.obtenerMesas();
       
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
  obtenerMesas(){
    this.data.getListaPedidos("mesas").subscribe(lista => {
      this.mesas=lista;
      for (let j=0; j<=this.pedidosCerrados.length-1;j++){
         for (let i=0; i<=this.mesas.length-1;i++){      
            if(this.mesas[i].codigo==this.pedidosCerrados[j].codigoMesa){ 
              this.mesasParaCerrar.push(this.mesas[i])
                this.vacia=this.mesasParaCerrar.length==0;           
            }
          }
      } 
      console.log ("mesasParaCerrar:", this.mesasParaCerrar)    
      this.dataSource = new MatTableDataSource(this.mesasParaCerrar);      
      console.log("mesasParaCerrar: ",this.mesasParaCerrar); 
    });
    console.log("mesasParaCerrar: ",this.mesasParaCerrar)
   }

   obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista;
      for (let i=0; i<=this.pedidos.length-1;i++){
        if(this.pedidos[i].estado==EstadoPedido.cerrado){ 
          this.pedidosCerrados.push(this.pedidos[i])          
        }
      }
      // this.vacia=this.pedidosCerrados.length==0; 
      console.log("this.vacia", this.vacia)
      this.obtenerMesas();
      
    });
    
   }
   cerrarMesa(item){   
    // this.data.getListaMesas("mesas").subscribe(lista => {
    //   this.mesas=lista;
    //   for (let i=0; i<=this.mesas.length-1;i++){
    //     if(this.mesas[i].codigo==item.codigoMesa){ 
    //       this.mesa=this.mesas[i];
    //       console.log("la mesa", this.mesa);
          item.estado=EstadoMesa.cerrada;
          console.log("actualizo esta mesa: ",item)
          this.auth.actualizarMesa(item).then(res => {
            console.log("mesa actualizada", item)
          });  
          console.log("actualizo reservas") 
          this.actualizarReservas(item);      
      //   }
      // }
      
    // });
    
   }


   actualizarReservas(item){
    this.data.getListaReservas("reservas").subscribe(lista => {
      this.reservas=lista; 
      console.log("reservas. ", this.reservas)
      console.log("longitud", this.reservas.length)
      for (let i=0; i<=this.reservas.length-1;i++){        
        console.log("reservas ",this.reservas[i])
        console.log("codigo de mesa ",this.reservas[i].codigoMesa)
         if (this.reservas[i].codigoMesa==item.codigo 
          && this.reservas[i].estado==EstadoReserva.activa){
            this.finalizarReserva(this.reservas[i]);                 
          }
      }
      console.log("reservas: ",this.reservas); 
    });
   }

   finalizarReserva(elemento){     
      elemento.estado=EstadoReserva.finalizada;
      console.log("elemento: ",elemento)    
      this.auth.actualizarReserva(elemento).then(res => {
        console.log("reserva finalizada")
      });
      console.log("reserva finalizada", elemento)
    }

}
