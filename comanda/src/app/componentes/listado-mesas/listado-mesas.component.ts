import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-listado-mesas',
  templateUrl: './listado-mesas.component.html',
  styleUrls: ['./listado-mesas.component.scss']
})
export class ListadoMesasComponent implements OnInit {
  
  
  public vacia:boolean;
  private columsMesa: string[] = ['NumeroMesa', 'CantidadComensales', 'Estado', 'Codigo'];
  public mesas:Array<any> = []; 
  private dataSource = new MatTableDataSource(this.mesas);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
 
 
  constructor( private  data:  AuthService) {
    this.obtenerMesas();  

   } 
  
  ngOnInit() {}  

    obtenerMesas() {
    this.data.getListaMesas("mesas").subscribe(lista => {
        this.mesas=lista; 
        this.vacia=this.mesas.length==0;
     
    });
    console.log("Mesas: ",this.mesas);  
} 

}
