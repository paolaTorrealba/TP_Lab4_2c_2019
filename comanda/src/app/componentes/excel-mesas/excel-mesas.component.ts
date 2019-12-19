import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { AuthService } from 'src/app/servicios/auth.service';

import { ExcelService } from 'src/app/servicios/excel.service';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  

@Component({
  selector: 'app-excel-mesas',
  templateUrl: './excel-mesas.component.html',
  styleUrls: ['./excel-mesas.component.scss']
})
export class ExcelMesasComponent implements OnInit {
  public excel=[];
  public title = 'excel-upload-download';
  public mesas:Array<any> = []; 
  constructor( private  data:  AuthService,
    private excelService:ExcelService,
    private http: HttpClient) {
  
    this.obtenerMesas();
   }

   exportAsXLSX():void {  
     console.log("exportando")
     this.excelService.exportAsExcelFile(this.mesas, 'mesas');  
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
}
