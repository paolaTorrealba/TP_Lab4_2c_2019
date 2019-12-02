import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { EstadoMesa, EstadoReserva, Perfil } from 'src/app/clases/enum';
import { MatTableDataSource, MatDialog } from '@angular/material';
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
  public estado=EstadoMesa.cerrada;


  public elMail:string;
  public usuario;
  public usuarios;
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
     this.obtenerMesas();
     this.obtenerReservas();

   }

  ngOnInit() {}

  obtenerMesas() {
    this.data.getListaMesas("mesas").subscribe(lista => {
        this.mesas=lista; 
        console.log("Mesas: ",this.mesas); 
        console.log("lista: ",lista); 
     
    });
    console.log("Mesas: ",this.mesas);  
   } 


   obtenerReservas() {
    this.data.getListaReservas("reservas").subscribe(lista => {
        this.reservas=lista; 
        console.log("reservas: ",this.reservas); 
        console.log("lista: ",lista);      
    });
    console.log("reservas: ",this.reservas);  
   } 

   obtenerUsuario() {
 
    this.usuarioService.EstaLogeado().subscribe(user => {
      if (user) {
        console.log("user.uid obtenido",user.uid)
        this.dataApi.TraerUno(user.uid, 'usuarios').pipe(take(1)).subscribe(userx => {

          if (userx) {
            if (userx.activo) {
              console.log("userx activo reserva:", userx)
              this.usuarioService.usuario = userx;

              this.foto = userx.foto;
              this.correo= userx.correo;
              this.nombre = userx.nombre;
              this.perfil = userx.perfil;
              this.logeado = true;
              
            }
            else {
              this.foto = "";
              this.nombre = "";
              this.correo= "";
              this.logeado = false;
              this.perfil = null;
            }
          }

        });
      }
      else {
        this.foto = "";
        this.nombre = "";
        this.correo= "";
        this.logeado = false;
        this.perfil = null;
      }
    });
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
