import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFirestore } from 'angularfire2/firestore';

import { map } from "rxjs/operators";

export enum perfil {
  cliente = 'cliente',
  empleado = 'empleado',
  socio = 'socio'
}
export enum actividad {
  bartender = 'bartender',
  cocinero = 'cocinero',
  cervecero = 'cervezero',
  mozo = 'mozo'
}
export interface usuario {
  correo: string,
  foto: string,
  logueado: boolean,
  activo: boolean,
  dni: string,
  cuil: string,
  nombre: string,
  apellido: string,
  id: string,
  clave: string,
  perfil: string
}
export interface mesa {
  id: string;
  numero: string;
  cantidadComensales: string;
  estado: string;
  codigo: string;
}
export interface listaEspera {
  id: string,
  turno: number,
  nombre: string,
  apellido: string,
  correo: string,
  estado: string,
  foto: string
}


export interface encuestaCliente {
  id: string,
  fecha: string,
  correo: string,
  pregunta1: string,
  respuesta1: string,
  pregunta2: string,
  respuesta2: string,
  pregunta3: string,
  respuesta3: string,
  pregunta4: string,
  respuesta4: string,
  pregunta5: string,
  respuesta5: string,
  pregunta6: string,
  respuesta6: string,
  comentario: string
}

export interface reserva {
  id: string;
  correo: string;
  codigoMesa: string;
  estado: string;
  
}

export interface pedido {
  correo: string,
  nombreCliente: string,
  apellidoCliente: string,
  estado: string,
  fecha: string,
  numero: string,
  productos: Array<any>,
  montoTotal: number,
  id: string,
  tiempoElaboracion: number,
  horaFinalizacion: string,
  foto: string,
  mesa:string,
  codigo: string
}

export interface producto {
  nombre: string,
  tipo: string,
  descripcion: string,
  tiempoPromedioElaboracion: number;
  precio: number;
  numeroProducto: number;
  id: string,
  foto: string,
}




@Injectable()
export class AuthProvider {
  perfil: perfil;
  actividad: actividad;
  empleado: 'empleado';
  constructor(private auth: AngularFireAuth,
    private db: AngularFirestore,
    private http: HttpClient) {

  }

  usuarioVacio() {
    return {
      id: '',
      nombre: '',
      apellido: '',
      cuil: '',
      correo: '',
      tipo: '',
      logueado: false,
      activo: false,
      dni: '',
      foto: '',
      clave: '',
      Perfil: "cliente"
    }

  }

  public login(email: string, pass: string) {
    return this.auth.auth.signInWithEmailAndPassword(email, pass)
    .then(user=>Promise.resolve(user))
    .catch(err=>Promise.reject(err));
  }

  public get Session(){
    return this.auth.authState;
   }

  logOut() {
    this.auth.auth.signOut();
  }

  getLista(tipo: string) {
    return this.db.collection(tipo).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as usuario;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  //-----------------USUARIOS--------------------
  crearUsuario(correo, pass) {
    return this.auth.auth.createUserWithEmailAndPassword(correo, pass);
  }

  traerUsuarios() {
    return this.db.collection('usuarios').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as usuario;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  actualizarUsuario(data) {
    return this.db.collection('usuarios').doc(data.id).update(data);
  }

  guardarUsuario(data) {
    return this.db.collection('usuarios').add(data);
  }


  //-----------------PEDIDOS--------------------
  guardarPedido(data) {
    return this.db.collection('pedidos').add(data);
  }

  actualizarPedido(data) {
    return this.db.collection('pedidos').doc(data.id).update(data);
  }

  //-----------------ENCUESTAS--------------------
  guardarEncuestaEmpleado(data) {
    return this.db.collection('encuestaEmpleado').add(data);
  }
 guardarEncuestaCliente(data) {
    return this.db.collection('encuestaCliente').add(data);
  }

  traerEncuestasClientes() {
    return this.db.collection('encuestaCliente').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as encuestaCliente;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  // traerEncuestasEmpleados() {
  //   return this.db.collection('encuestaEmpleado').snapshotChanges().pipe(map(rooms => {
  //     return rooms.map(a => {
  //       const data = a.payload.doc.data() as encuestaEmpleado;
  //       data.id = a.payload.doc.id;
  //       return data;
  //     })
  //   }));
  // }

  modificarEncuestaCliente(data) {
    return this.db.collection('encuestaCliente').doc(data.id).update(data);

  }

  //-----------------CLIENTES--------------------
  guardarCliente(data) {
    return this.db.collection('clientes').add(data);
  }

  //-----------------MESAS--------------------
  guardarMesa(data) {
    return this.db.collection('mesas').add(data);
  }

  actualizarMesa(data) {
    return this.db.collection('mesas').doc(data.id).update(data);
  }

  traerMesas() {
    return this.db.collection('mesas').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as mesa;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }


  //-----------------RESERVAS--------------------
  guardarReserva(data) {
    return this.db.collection('reservas').add(data);
  }
  
  confirmarReserva(data) {
    return this.db.collection('reservas').doc(data.id).update(data);
  }
  actualizarReserva(data) {
    return this.db.collection('reservas').doc(data.id).update(data);
  }

  traerReservas() {
    return this.db.collection('reservas').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as reserva;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  
 //-----------------LISTA ESPERA--------------------
  guardarListaEspera(data) {
    return this.db.collection('listaEspera').add(data);
  }

  traerListaEspera() {
    return this.db.collection('listaEspera').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as listaEspera;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  actualizarListaEspera(data) {
    return this.db.collection('listaEspera').doc(data.id).update(data);
  }


  //-----------------PRODUCTOS--------------------

  traerListaProductos() {
      return this.db.collection('productos').snapshotChanges().pipe(map(rooms => {
        return rooms.map(a => {
          const data = a.payload.doc.data() as producto;
          data.id = a.payload.doc.id;
          return data;
        })
      }));
  }

  guardarProducto(data) {
    return this.db.collection('productos').add(data);
  }


  //-----------------QR--------------------
  getQr() {
    return this.db.collection('qr').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as mesa;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }



  //---- Encuesta cliente -----//
  







  




}
