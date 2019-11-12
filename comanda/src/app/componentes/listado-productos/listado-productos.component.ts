import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss']
})
export class ListadoProductosComponent implements OnInit {
  productos;
  constructor(private  data:  AuthService) { 
    this.obtenerProductos();
  }

  ngOnInit() {}

  obtenerProductos() {
    this.data.getListaProductos("productos").subscribe(lista => {
        this.productos=lista; 
        console.log("Productos: ",this.productos); 
        console.log("lista: ",lista); 
     
    });
    console.log("Productos: ",this.productos);  
} 

}
