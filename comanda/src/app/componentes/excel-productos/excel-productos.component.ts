import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { AuthService } from 'src/app/servicios/auth.service';
import { ExcelService } from 'src/app/servicios/excel.service';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-excel-productos',
  templateUrl: './excel-productos.component.html',
  styleUrls: ['./excel-productos.component.scss']
})
export class ExcelProductosComponent implements OnInit {
  public excel=[];
  public title = 'excel-upload-download';
  public productos:Array<any> = []; 

  constructor( private  data:  AuthService,
    private excelService:ExcelService,
    private http: HttpClient) {
  
    this.obtenerProductos();
   }

   exportAsXLSX():void {  
     console.log("exportando")
     this.excelService.exportAsExcelFile(this.productos, 'productos');  
   }  
  
  ngOnInit() {}

  obtenerProductos() {
    this.data.getListaProductos("productos").subscribe(lista => {
        this.productos=lista; 
        
    });
    console.log("productos: ",this.productos);  
} 
}