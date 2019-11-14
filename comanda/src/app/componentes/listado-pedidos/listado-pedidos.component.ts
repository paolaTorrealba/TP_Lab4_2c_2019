import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.scss']
})
export class ListadoPedidosComponent implements OnInit {

  public pedidos:Array<any> = [];


  constructor(private  data:  AuthService,
    private storage: AngularFireStorage, 
    private auth: AuthProvider) { 
    this.obtenerPedidos();
  }

  ngOnInit() {
  }

  obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista; 
      console.log("pedidos: ",this.pedidos); 
    });
    console.log("pedidos: ",this.pedidos)
   }

}
