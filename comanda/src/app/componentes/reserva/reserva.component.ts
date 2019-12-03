import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { EstadoMesa, EstadoReserva, Perfil } from 'src/app/clases/enum';
import { MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DataApiService } from 'src/app/servicios/data-api.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {
  
  public codigoModel: string;
  public correo:string;
  public mesas:Array<any> = [];
  public reservas:Array<any> = [];
  public tieneReserva:boolean;
  public estado=EstadoMesa.cerrada;
  public miReserva:string;
  
  public perfil: Perfil;
  foto = '';
  nombre = '';
  logeado:boolean;

  private columsMesas: string[] = ['Numero Mesa','Codigo Mesa', 'Estado','Cantidad Comensales', 'Seleccionar Mesa'];
  private dataSource = new MatTableDataSource(this.mesas);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
  
  constructor(private  data:  AuthService,
    private usuarioService: UsuarioService,
    private dataApi: DataApiService,
    private auth: AuthProvider) {
           this.obtenerUsuario(); 
   } 

  ngOnInit() {}

  obtenerMesas() {
    console.log("---MESAS---")
    this.data.getListaMesas("mesas").subscribe(lista => {
        this.mesas=lista;
        this.dataSource = new MatTableDataSource(this.mesas);
        this.noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));      
    });
    console.log("Mesas: ",this.mesas);  
   } 


   obtenerReservas() {  
      this.tieneReserva=false;
      this.data.getListaReservas("reservas").subscribe(lista => {
          this.reservas=lista; 
          console.log("reservas obtenidas",this.reservas)
          for(let i=0; i<=this.reservas.length-1; i++){
            if(this.reservas[i].correo==this.correo &&
              this.reservas[i].estado=="activa"){
              this.miReserva=this.reservas[i].codigoMesa; 
              this.tieneReserva=true;
              
            }
          }
         
          if (!this.tieneReserva ){
            console.log("no tiene reserva")           
            this.obtenerMesas();
          
            
          }
              
      });
      console.log("reservas: ",this.reservas);  
  
    
   } 

   obtenerUsuario() {
 
    this.usuarioService.EstaLogeado().subscribe(user => {
      if (user) {      
        console.log("user: ", user)  
        this.dataApi.TraerUno(user.uid, 'usuarios').pipe(take(1)).subscribe(userx => {

          if (userx) {           
              if (userx.activo) {   
                console.log("esta activo")   
                this.usuarioService.usuario = userx;            
                this.correo= userx.correo;                 
                this.obtenerReservas(); 
              }
              else {  
                this.correo= "";
              }
          }

        });
      }
      else {      
        this.correo= "";       
      }
    });

    if (this.tieneReserva ==undefined){
      this.obtenerMesas();
    }
  }


 seleccionarMesa(item){     
      console.log("item: ", item)  
      console.log("this.correo: ", this.correo)     
      item.estado=EstadoMesa.reservada;  

      console.log("item: ", item)  
      this.auth.actualizarMesa(item).then(res => {
        console.log("mesa reservada")
      });
      item.correo=this.correo;  
      this.crearReserva(item);

   }

   
   crearReserva (item){
     
          let data= {  
            "correo": this.correo,       
            "estado": EstadoReserva.activa,
            "codigoMesa": item.codigo
          }     
          console.log("guardo la reserva",data)
          this.auth.guardarReserva(data).then(res =>{
          }).catch(error => {
          console.log(error,"error al guardar la reserva"); 
       });
   }

}
