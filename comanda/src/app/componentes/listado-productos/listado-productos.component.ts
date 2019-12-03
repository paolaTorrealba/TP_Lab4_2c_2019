import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss']
})
export class ListadoProductosComponent implements OnInit {
  private columsProducto: string[] = ['NombreProducto', 'Tipo', 'Descripcion', 'TiempoPromedio','Precio'];

  public vacia:boolean;
  public productos:Array<any> = []; 
  private dataSource = new MatTableDataSource(this.productos);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
  constructor(private  data:  AuthService) { 
    this.obtenerProductos();
  }

  ngOnInit() {}

  obtenerProductos() {
    this.data.getListaProductos("productos").subscribe(lista => {
        this.productos=lista; 
        this.vacia=this.productos.length==0;
     
    });
    console.log("Productos: ",this.productos);  
} 

}
