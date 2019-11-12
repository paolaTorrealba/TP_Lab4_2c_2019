import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-pedir-platos',
  templateUrl: './pedir-platos.component.html',
  styleUrls: ['./pedir-platos.component.scss']
})
export class PedirPlatosComponent implements OnInit {
  productos;
  public listarBebidas:boolean=false;
  public listarPlatos: boolean=false;
  public tipo:string;
  seleccionados: Array<any> = [];
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

   agregarPedido(item){
     this.seleccionados.push(item);
     console.log("agrego el item")
     console.log(" this.seleccionados: ",  this.seleccionados)
   }

   mostrarBebidas(){

    //  this.listarBebidas=true;
    //  this.listarPlatos=false;
     this.tipo="bebida";
     console.log("mostrar bebidas", this.listarBebidas)
    // console.log("productos:",this.productos);
    // console.log("la longitud:",this.productos.length);
    // for (let i=0; i<=this.productos.length -1; i++){
    //   console.log(this.productos[i]);
    //       if(this.productos[i].tipo=="bebida"){
    //         this.listaBebidas=this.productos[i];
    //       }
    // }
    // console.log("bebidas:",this.listaBebidas);
   }

   mostrarPlatos(){
    this.tipo="plato";
//     for (let i=0; i<=this.productos.lenght -1; i++){
//       if(this.productos[i].tipo=="plato"){
//         this.listaPlatos=this.productos[i];
//       }
// }
// console.log("bebidas:",this.listaPlatos )
   }

}
