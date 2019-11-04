import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';


export interface usuario {
  correo:string,
  foto:string,
  tipo:string,
  logueado:boolean,
  estado:string,
  dni:string,
  cuil:string,
  nombre:string,
  apellido:string,
  id: string,
  clave: string,
}

export interface mesa {
  id:string,
  numero:string,
  cantidadComensales:string,
  tipo:string,
  estado:string,
  foto:string,
  codigo:string
}

export interface listaEspera {
  id:string,
  turno:number,
  nombre:string,
  apellido:string,
  correo:string,
  estado:string,
  foto:string,
  
}



export interface encUsuario {
  id:string,
  correo:string,
  pregunta1: {
    bueno:number,
    excelente:number,
    malo:number,
    mediocre:number,
    pesimo:number
  },
  pregunta2: {
    no:number,
    si:number
  },
  pregunta3: {
    item1:number,
    item2:number,
    item3:number,
    item4:number,
    item5:number,
    item6:number
  },
  pregunta4: {
    MuyBueno:number,
    Bueno:number,
    Normal:number,
    Malo:number
  },
  comentarios:Array<any>,
  pregunta5: {
    item1:number,
    item2:number,
    item3:number,
    item4:number
  },
  pregunta6: {
    item1:number,
    item2:number,
    item3:number,
    item4:number
  }
}


export interface encuestaCliente {
  id: string,
  fecha:string,
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
  correo:string,
  nombre:string,
  apellido:string,
  horario:string,
  foto:string,
  cantPersonas:string,
  mesa:string,
  estado:string,
  id:string
}

export interface pedido {
  correo:string,
  nombreCliente:string,
  apellidoCliente:string,
  estado:string,
  fecha:string,
  numero:string,
  tipo:string,
  productos:Array<any>,
  montoTotal:number,
  id:string,
  tiempoElaboracion: number,
  horaFinalizacion: string,
  delivery:boolean,
  foto:string,
  direccion:string,
  montoEnvio:number,
  tiempoEnvio:number
}

export interface producto {
  tipo:string,
  descripcion:string,
  nombre:string,
  foto:string,
  tiempoPromedioElaboracion:number; 
  precio: number;
  estado :string;
  numeroProducto:number;
  id:string
}

export interface chat {
  tipo:string,
  correo:string,
  nombre:string,
  mensaje:string,
  fecha:string,
  id:string,
  para:string
}

@Injectable()
export class AuthProvider {

  constructor(private auth: AngularFireAuth,
   private db:AngularFirestore, 
   private http: HttpClient) {

  }

 
  login (email:string,pass:string) {
    return this.auth.auth.signInWithEmailAndPassword(email,pass);
  }

  logOut(){
    this.auth.auth.signOut();
  }

  getLista(tipo:string) {
    return this.db.collection(tipo).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as usuario;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

//-----USUARIOS-----
  getUsuarios() {
    return this.db.collection('usuarios').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as usuario;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  updateUsuario(data) {
    return this.db.collection('usuarios').doc(data.id).update(data);
  }

  guardarUsuario(data) {
    return this.db.collection('usuarios').add(data);
  }

  guardarPedido(data) {
    return this.db.collection('pedidos').add(data);
  }

  guardarEncuestaEmpleado(data) {
    return this.db.collection('encuestaEmpleado').add(data);
  }

  crearUsuario(correo,pass) {
    return this.auth.auth.createUserWithEmailAndPassword(correo, pass);
  }
  //-----CLIENTES-----
  guardarCliente(data) {
    return this.db.collection('clientes').add(data);
  }

  //-----MESA-----
  guardarMesa(data) {
    return this.db.collection('mesas').add(data);
  }

  getMesas() {
    return this.db.collection('mesas').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as mesa;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }
  
//---Lista Espera ---//

guardarListaEspera(data) {
  return this.db.collection('listaEspera').add(data);
}

getListaEspera() {
  return this.db.collection('listaEspera').snapshotChanges().pipe(map(rooms => {
    return rooms.map(a =>{
      const data = a.payload.doc.data() as listaEspera;
      data.id = a.payload.doc.id;
      return data;
    })
  }));
}


updateListaEspera(data) {
  return this.db.collection('listaEspera').doc(data.id).update(data);
}
//--FIN ---Lista Espera ---//


  //-----PRODUCTOS------
  getListaProdcutos(tipo:string) {
    return this.db.collection(tipo).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as producto;
        return data;
      })
    }));
  }

  guardarProducto(data) {
    return this.db.collection('productos').add(data);
  }

  updateMesa(data) {
    return this.db.collection('mesas').doc(data.id).update(data);
  }

  getQr() {
    return this.db.collection('qr').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as mesa;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  nuevaEncuesta(data) {
    return this.db.collection('encuestasUsuarios').add(data);
  }

  modificarEncuesta(data) {
    return this.db.collection('encuestasUsuarios').doc(data.id).update(data);
  }

  getEncUsuarios() {
    return this.db.collection('encuestasUsuarios').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as encUsuario;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  //---- Encuesta cliente -----//
  nuevaEncuestaCliente(data) {
    return this.db.collection('encuestaCliente').add(data);
  }
  getEncuestasClientes(){
  return this.db.collection('encuestaCliente').snapshotChanges().pipe(map(rooms => {
    return rooms.map(a =>{
      const data = a.payload.doc.data() as encuestaCliente;
      data.id = a.payload.doc.id;
      return data;
    })
  }));
}

modificarEncuestaCliente(data) {
  return this.db.collection('encuestaCliente').doc(data.id).update(data);
  
}

//---FIN --Encuesta cliente -----//

  nuevaReserva(data) {
    return this.db.collection('reservas').add(data);
  }

  confirmarReserva(data) {
    return this.db.collection('reservas').doc(data.id).update(data);
  }

  getReservas() {
    return this.db.collection('reservas').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as reserva;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  getProductos() {
    return this.db.collection('productos').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as producto;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  nuevoPedido(data) {
    return this.db.collection('pedidos').add(data);
  }

  getPedidos() {
    return this.db.collection('pedidos').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as pedido;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  actualizarPedido(data) {
    return this.db.collection('pedidos').doc(data.id).update(data);
  }

  getChat() {
    return this.db.collection('mensajes').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as chat;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  nuevoChat(data) {
    return this.db.collection('mensajes').add(data);
  }

}
