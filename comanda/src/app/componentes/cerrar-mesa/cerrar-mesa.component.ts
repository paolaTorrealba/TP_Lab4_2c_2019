import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, empty } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-cerrar-mesa',
  templateUrl: './cerrar-mesa.component.html',
  styleUrls: ['./cerrar-mesa.component.scss']
})
export class CerrarMesaComponent implements OnInit {
  public mesas:Array<any> = [];
  public reservas:Array<any> = [];
  public estado:string="cerrada";
  public activa:string="activa";
  constructor(private  data:  AuthService,   
    private auth: AuthProvider) { 
    this.obtenerMesas();
  }

  ngOnInit() {}

  obtenerMesas(){
    this.data.getListaPedidos("mesas").subscribe(lista => {
      this.mesas=lista; 
      console.log("mesas: ",this.mesas); 
    });
    console.log("mesas: ",this.mesas)
   }

   cerrarMesa(item){
      console.log("item: ", item)        
      item.estado=this.estado;    
      this.auth.updateMesa(item).then(res => {
        console.log("mesa actulizada", item)
      });

      console.log("actualizo reservas") 
      this.actualizarReservas(item);
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
          && this.reservas[i].estado==this.activa){
            this.finalizarReserva(this.reservas[i]);                 
          }
      }
      console.log("reservas: ",this.reservas); 
    });
   }

   finalizarReserva(elemento){     
      elemento.estado="finalizada";
      console.log("elemento: ",elemento)    
      this.auth.actualizarReserva(elemento).then(res => {
        console.log("reserva finalizada")
      });
      console.log("reserva finalizada", elemento)
    }

}
