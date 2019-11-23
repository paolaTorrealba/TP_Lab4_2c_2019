import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthProvider } from 'src/app/providers/auth';
import { AuthService } from 'src/app/servicios/auth.service';
import { EstadoMesa } from 'src/app/clases/enum';


@Component({
  selector: 'app-alta-de-mesa',
  templateUrl: './alta-de-mesa.component.html',
  styleUrls: ['./alta-de-mesa.component.scss']
})
export class AltaDeMesaComponent implements OnInit {

  //Datos de la mesa
  public numeroModel: string;
  public cantidadComensalesModel: string
  public codigo:string

  public mesas;
  public lamesa;
 
  constructor( private  data:  AuthService,
    private auth: AuthProvider) {  

      this.obtenerMesas();

 }

  ngOnInit() { }

  public agregarMesa() {
     console.log("agregar Mesa")
     console.log("codigo: ", this.codigo) 
     let data= {  
        "numero": this.numeroModel,
        "cantidadComensales": this.cantidadComensalesModel,  
        "estado": EstadoMesa.cerrada,
        "codigo": this.codigo   
     }     
    
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
  this.auth.actualizarMesa(item).then(res => {      
  });
} 


generarCodigo(){
  this.codigo= '';
  console.log("genero el codigo")   
  let rString = this.randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  console.log(rString);       
}

randomString(length, chars) {    
 for (var i = length; i > 0; --i) 
 this.codigo += chars[Math.floor(Math.random() * chars.length)];

}

}
