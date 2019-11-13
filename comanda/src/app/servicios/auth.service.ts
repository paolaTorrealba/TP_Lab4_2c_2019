import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore"; 
import { map } from "rxjs/operators";

export interface mesa {
  id:string;
  numero:string;
  cantidadComensales:string; 
  estado:string;
}

export interface usuario {
  correo:string,
  foto:string,
  logueado:boolean,
  activo:boolean,
  dni:string,
  cuil:string,
  nombre:string,
  apellido:string,
  id: string,
  clave: string,
  perfil:string
}
export interface pedido {
  correo:string,
  nombreCliente:string,
  apellidoCliente:string,
  estado:string,
  fecha:string,
  numero:string,
  // tipo:string,
  productos:Array<any>,
  montoTotal:number,
  id:string,
  tiempoElaboracion: number,
  horaFinalizacion: string,
  foto:string
  codigo:string
}
export interface producto {
  nombre:string,
  tipo:string,
  descripcion:string, 
  tiempoPromedioElaboracion:number; 
  precio: number; 
  numeroProducto:number;
  id:string,
  foto:string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth,
     public router: Router, 
     public firestore: AngularFirestore) {}

    public guardarMesa(data) {
      return this.firestore.collection('mesa').add(data);
    }
    getListaMesas(tipo:string) {  
      return this.firestore.collection(tipo).snapshotChanges().pipe(map(rooms => {
        return rooms.map(a =>{
          const data = a.payload.doc.data() as mesa;
          data.id = a.payload.doc.id;
          return data;
        })
      }));
    }  

    getListaProductos(tipo:string) {
      return this.firestore.collection(tipo).snapshotChanges().pipe(map(rooms => {
        return rooms.map(a =>{
          const data = a.payload.doc.data() as producto;
          return data;
        })
      }));
    }

    getListaPedidos(tipo:string) {
      return this.firestore.collection(tipo).snapshotChanges().pipe(map(rooms => {
        return rooms.map(a =>{
          const data = a.payload.doc.data() as pedido;
          return data;
        })
      }));
    }

    public guardarPedido(data) {
      return this.firestore.collection('pedido').add(data);
    }

    getListaUsuarios(tipo:string) {
      return this.firestore.collection(tipo).snapshotChanges().pipe(map(rooms => {
        return rooms.map(a =>{
          const data = a.payload.doc.data() as usuario;
          data.id = a.payload.doc.id;
          return data;
        })
      }));
    }
}
