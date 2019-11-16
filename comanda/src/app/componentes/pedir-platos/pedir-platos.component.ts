import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';


@Component({
  selector: 'app-pedir-platos',
  templateUrl: './pedir-platos.component.html',
  styleUrls: ['./pedir-platos.component.scss']
})
export class PedirPlatosComponent implements OnInit {
  productos;
  usuarios;
  pedidos;
  usuarioActual;
  correo;
  codigoMesa;
  public activa:string="activa";
  public reservas;
  public tiempoTotal:number;
  public nombre:string;
  public apellido:string;
  public listarBebidas:boolean=false;
  public listarPlatos: boolean=false;
  public tipo:string;
  public pedidoRealizado:boolean= false;
  public montoTotal:number;
  seleccionados: Array<any> = [];
  constructor(private  data:  AuthService,
    private auth: AuthProvider) { 
    this.correo=localStorage.getItem("usuarioComanda");
    console.log("correo", this.correo)
    this.montoTotal=0;
    this.tiempoTotal=0;
    this.obtenerReservas();
    this.obtenerProductos();
    this.obtenerPedidos();
    this.obtenerCliente();
   
  }

  ngOnInit() {}

  obtenerReservas() {
    this.data.getListaReservas("reservas").subscribe(lista => {
        this.reservas=lista;
        console.log("reservas: ",this.reservas); 
        for (let i=0; i<=this.reservas.length-1; i++){
          if (this.reservas[i].estado==this.activa
            && this.reservas[i].correo==this.correo){
              this.codigoMesa=this.reservas[i].codigoMesa;
            }
        } 
    });
    console.log("reservas: ",this.reservas);  
   } 

  obtenerProductos() {
    this.data.getListaProductos("productos").subscribe(lista => {
          this.productos=lista; 
          console.log("Productos: ",this.productos); 
          console.log("lista: ",lista); 
      
      });
      console.log("Productos: ",this.productos);  
   } 

   agregarPedido(item){
     item.estadoProdPedido="pendiente";
     this.seleccionados.push(item);
     console.log("agrego el item")
     console.log(" this.seleccionados: ",  this.seleccionados)
     this.montoTotal= this.montoTotal+item.precio;
     console.log("monto:", this.montoTotal)
     this.tiempoTotal = this.tiempoTotal+item.tiempoPromedioElaboracion;
     console.log("item:", item)
     console.log("item:", item.tiempoPromedioElaboracion)
     console.log("tiempo:", this.tiempoTotal)


   }

   quitarPedido(item){
     console.log("resto el valor de item" )
     this.montoTotal= this.montoTotal-item.precio;
     var indice = this.seleccionados.indexOf(item); 
     this.seleccionados.splice(indice, 1); 
     console.log("this.seleccionados: ",this.seleccionados )
     this.tiempoTotal = this.tiempoTotal-item.tiempoPromedioElaboracion;
     console.log("tiempo:", this.tiempoTotal)
  }

   mostrarBebidas(){
     this.tipo="bebida";
     console.log("mostrar bebidas", this.listarBebidas)
   }

   mostrarPlatos(){
    this.tipo="plato";
    console.log("mostrar plato", this.listarPlatos)
   }

   obtenerCliente(){
    let correo= localStorage.getItem("usuarioComanda");
    this.data.getListaUsuarios("usuarios").subscribe(lista => {
            this.usuarios=lista; 
            console.log("usuarios: ", this.usuarios)
            console.log("lista: ", lista)
            for (let i=0; i<= this.usuarios.length -1; i++){
              if (this.usuarios[i].correo==correo){
                this.nombre=this.usuarios[i].nombre;
                this.apellido=this.usuarios[i].apellido;
              }
            }
            console.log("usuarios: ",this.usuarios); 
            console.log("lista: ",lista); 
  
      });
   }

   obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista; 
    });
    console.log("pedidos: ",this.pedidos)
   }

   guardarPedido(){
    this.obtenerPedidos();
    console.log("cantidad pdidos: ",  this.pedidos.length)
    let data = {
      correo:localStorage.getItem("usuarioComanda"),
      nombreCliente:this.nombre,
      apellidoCliente:this.apellido,
      estado:"pendiente",
      fecha: new Date(),
      numero: this.pedidos.length + 1,
      productos: this.seleccionados,
      montoTotal:this.montoTotal,
      tiempoElaboracion: this.tiempoTotal,
      foto:"",
      codigo:"",
      mesa:this.codigoMesa
    }
    console.log("pedido a guardar: ", data)
    this.auth.guardarPedido(data).then(res =>{
      this.pedidoRealizado= true;
      this.seleccionados= [];
      this.montoTotal=0;
      this.tiempoTotal=0;
        }).catch(error => {
      console.log(error,"error al guardar el pedido"); 
  });
    
   }
}
