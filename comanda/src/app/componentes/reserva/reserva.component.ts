import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { EstadoMesa, EstadoReserva } from 'src/app/clases/enum';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {
  
  public codigoModel: string;
  public correo:string;
  public mesas:Array<any> = [];
  public reservas:Array<any> = [];
  public estado=EstadoMesa.cerrada;


  constructor(private  data:  AuthService,
    private auth: AuthProvider) {     
     this.correo=localStorage.getItem("usuarioComanda");
     this.obtenerMesas();
     this.obtenerReservas();
   }

  ngOnInit() {}

  obtenerMesas() {
    this.data.getListaMesas("mesas").subscribe(lista => {
        this.mesas=lista; 
        console.log("Mesas: ",this.mesas); 
        console.log("lista: ",lista); 
     
    });
    console.log("Mesas: ",this.mesas);  
   } 


   obtenerReservas() {
    this.data.getListaReservas("reservas").subscribe(lista => {
        this.reservas=lista; 
        console.log("reservas: ",this.reservas); 
        console.log("lista: ",lista);      
    });
    console.log("reservas: ",this.reservas);  
   } 


   seleccionarMesa(item){          
      item.estado=EstadoMesa.reservada;    
      this.auth.actualizarMesa(item).then(res => {
        console.log("mesa reservada")
      });
      this.crearReserva(item);

   }

   
   crearReserva (item){
     
          let data= {  
            "correo": this.correo,       
            "estado": EstadoReserva.activa,
            "codigoMesa": item.codigo
          }     
          console.log("guardo la reserva",data)
          this.auth.guardarReserva(data).then(res =>{
          }).catch(error => {
          console.log(error,"error al guardar la reserva"); 
       });
   }

}
