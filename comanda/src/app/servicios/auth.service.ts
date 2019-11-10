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
}
