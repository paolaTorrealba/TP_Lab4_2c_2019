import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AuthProvider } from 'src/app/providers/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.scss']
})
export class ListadoPedidosComponent implements OnInit {

  public info:boolean;
  public vacia:boolean;
  private columsPedido: string[] = ['Mesa', 'Importe', 'Estado', 'Tiempo Elaboracion','Detalle'];
  private columsProductoPedido: string[] = ['Descripcion','Precio','Empleado','Estado Producto','Tiempo Promedio Elaboracion'];
  public pedidos:Array<any> = [];
  public productos:Array<any> = [];
  private dataSourceProd : any;
  private noDataProd: any;
  private dataSource = new MatTableDataSource(this.pedidos);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));

  constructor(private  data:  AuthService,
    private storage: AngularFireStorage, 
    private auth: AuthProvider) { 
    this.obtenerPedidos();
    this.info=false;
  }

  ngOnInit() {
  }

  obtenerPedidos(){
    this.data.getListaPedidos("pedidos").subscribe(lista => {
      this.pedidos=lista; 
      this.vacia=this.pedidos.length==0;      
    });
    if ( this.pedidos==undefined || this.pedidos.length==0 )
          {
            this.vacia=true;
          }   
    console.log("pedidos: ",this.pedidos)
   }

   showInfo(item){
     if (!this.info){
        console.log("item", item)
        this.info=true;
        this.productos=item.productos;
        console.log("productos", this.productos)      
     }else{
        this.info=false;
        this.productos = [];     
     }
     this.dataSourceProd = new MatTableDataSource(this.productos);
     this.noDataProd = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
    
   }
}
