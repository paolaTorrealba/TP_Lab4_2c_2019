import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthProvider } from 'src/app/providers/auth';
import { AuthService } from 'src/app/servicios/auth.service';
import { EstadoMesa } from 'src/app/clases/enum';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


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
    private router: Router, 
    private auth: AuthProvider) {  

      this.obtenerMesas();

 
     
 }

  ngOnInit() {
    this.obtenerMesas(); 
    if (this.mesas != null){     
         this.numeroModel=this.mesas.length+1;  
    }

  }

  public confirmar() {
     console.log("agregar Mesa")
     console.log("codigo generado: ", this.codigo) 
     let data= {  
        "numero": this.numeroModel,
        "cantidadComensales": this.cantidadComensalesModel,  
        "estado": EstadoMesa.cerrada,
        "codigo": this.codigo   
     }     
    
    this.auth.guardarMesa(data).then(res =>{
      this.router.navigate(['/principal']);
    }).catch(error => {
      console.log(error,"error al guardar la mesa"); 
  });
  }

  obtenerMesas() {
    this.data.getListaMesas("mesas").subscribe(lista => {
        this.mesas=lista; 
        if (this.mesas != null){
          this.numeroModel=this.mesas.length+1;  
        }
        console.log("Mesas: ",this.mesas);        
        this.lamesa=lista[0];   
    });
    console.log("Mesas: ",this.mesas);
    if (this.mesas != null){
      this.numeroModel=this.mesas.length+1;  
    }
   
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
        let rString = this.randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        console.log("el codigo ", this.codigo);
     
   }

   randomString(length, chars) {    
        for (var i = length; i > 0; --i) 
        this.codigo += chars[Math.floor(Math.random() * chars.length)];

   }

}
