import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-listado-mesas',
  templateUrl: './listado-mesas.component.html',
  styleUrls: ['./listado-mesas.component.scss']
})
export class ListadoMesasComponent implements OnInit {
  mesas;
  constructor( private  data:  AuthService) {
    this.obtenerMesas();
   }

  ngOnInit() {
  }

    obtenerMesas() {
    this.data.getListaMesas("mesas").subscribe(lista => {
        this.mesas=lista; 
        console.log("Mesas: ",this.mesas); 
        console.log("lista: ",lista); 
     
    });
    console.log("Mesas: ",this.mesas);  
} 

}
