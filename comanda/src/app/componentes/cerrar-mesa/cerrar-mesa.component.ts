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
  public estado:string="cerrada";
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
        console.log("mesa cerrada")
      });
   }

}
