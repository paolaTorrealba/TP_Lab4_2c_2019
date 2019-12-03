import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { AuthService } from 'src/app/servicios/auth.service';
import { ExcelService } from 'src/app/servicios/excel.service';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-excel-empleados',
  templateUrl: './excel-empleados.component.html',
  styleUrls: ['./excel-empleados.component.scss']
})
export class ExcelEmpleadosComponent implements OnInit {
  public excel=[];
  public title = 'excel-upload-download';
  public usuarios:Array<any> = []; 

  constructor( private  data:  AuthService,
    private excelService:ExcelService,
    private http: HttpClient) {
  
    this.obtenerUsuarios();
   }

   exportAsXLSX():void {  
     console.log("exportando")
     this.excelService.exportAsExcelFile(this.usuarios, 'usuarios');  
   }  
  
  ngOnInit() {}

  obtenerUsuarios() {
    this.data.getListaUsuarios("usuarios").subscribe(lista => {
        this.usuarios=lista; 
        
    });
    console.log("usuarios: ",this.usuarios);  
} 
}
