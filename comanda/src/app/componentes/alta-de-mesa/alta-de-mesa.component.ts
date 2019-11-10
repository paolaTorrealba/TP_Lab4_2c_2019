import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthProvider } from 'src/app/providers/auth';
import { AuthService } from 'src/app/servicios/auth.service';
import { messaging } from 'firebase';
import { timer } from 'rxjs';

@Component({
  selector: 'app-alta-de-mesa',
  templateUrl: './alta-de-mesa.component.html',
  styleUrls: ['./alta-de-mesa.component.scss']
})
export class AltaDeMesaComponent implements OnInit {

  //Datos de la mesa
  numeroModel: string;
  cantidadComensalesModel: string

  mesas;
  lamesa;
 
  constructor( private  data:  AuthService,
    private auth: AuthProvider,
    private storage: AngularFireStorage, 
    private elRef: ElementRef) {  

      this.obtenerMesas();

 }

  ngOnInit() {
   

  }

  public agregarMesa() {
     console.log("agregar Mesa") 
     let data= {  
        "numero": this.numeroModel,
        "cantidadComensales": this.cantidadComensalesModel,  
        "estado": "cerrada"    
     }

      
    console.log("guardo la mesa")
    this.auth.guardarMesa(data).then(res =>{
    }).catch(error => {
      console.log(error,"error al guardar la mesa"); 
  });
  }

  obtenerMesas() {
    this.data.getListaMesas("mesas").subscribe(lista => {
        this.mesas=lista; 
        console.log("Mesas: ",this.mesas); 
        console.log("lista: ",lista); 
        this.lamesa=lista[0];   
    });
    console.log("Mesas: ",this.mesas);  
} 

cambiarEstadoMesa(item) {
  console.log("item: ",item); 
  console.log("mesas en cambiar: ",this.mesas); 
  console.log("lamesa: ",this.lamesa);
  item.estado= "otro"; 
  console.log("item modificado: ",item);
  this.auth.updateMesa(item).then(res => {      
  });
} 


}
