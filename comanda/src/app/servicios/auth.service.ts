import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
// import { AngularFireAuth } from 'angularfire2/auth'; 
// import { AngularFirestore } from 'angularfire2/firestore';

import { map } from "rxjs/operators";
import { Perfil } from '../clases/enum';

export interface mesa {
  id:string;
  numero:string;
  cantidadComensales:string; 
  estado:string;
  codigo: string;
}

export interface usuario {
  correo:string,
  foto:string,
  logeado:boolean,
  activo:boolean,
  nombre:string,
  apellido:string,
  id: string,
  clave: string,
  perfil:Perfil
}

export interface reserva {
  id: string;
  correo: string;
  codigoMesa: string;
  estado: string;
  
}
export interface pedido {
  correo:string,
  nombreCliente:string,
  apellidoCliente:string,
  estado:string,
  fecha:string,
  numero:number, 
  productos:Array<any>,
  montoTotal:number,
  id:string,
  tiempoElaboracion: number,
  horaFinalizacion: string,
  foto:string,
  mesa:string,
  codigo:string
}

export interface encuestaCliente {
  id:string; 
  date:Date;
  email: string;
  question1: string; 
  question2: string; 
  question3: string; 
  question4: string;  
  question5: string;   
 
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;

  commentary: string;  
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
          data.id = a.payload.doc.id;
          return data;
        })
      }));
    }

    getListaPedidos(tipo:string) {
      return this.firestore.collection(tipo).snapshotChanges().pipe(map(rooms => {
        return rooms.map(a =>{
          const data = a.payload.doc.data() as pedido;
          data.id = a.payload.doc.id;
          return data;
        })
      }));
    }

    getListaReservas(tipo:string) {
      return this.firestore.collection(tipo).snapshotChanges().pipe(map(rooms => {
        return rooms.map(a =>{
          const data = a.payload.doc.data() as reserva;
          data.id = a.payload.doc.id;
          return data;
        })
      }));
    }

    public guardarPedido(data) {
      return this.firestore.collection('pedido').add(data);
    }

    guardarEncuestaCliente(data) {
      return this.firestore.collection('encuestaCliente').add(data);
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

    getListaEncuestas(tipo:string) {
      return this.firestore.collection(tipo).snapshotChanges().pipe(map(rooms => {
        return rooms.map(a =>{
          const data = a.payload.doc.data() as encuestaCliente;
          data.id = a.payload.doc.id;
          return data;
        })
      }));
    }
}
